import express, { Application } from 'express'
import glob from 'glob'
import { Router } from './models/Router'
import { getLogger, Logger } from '../logger/logger'
import { Endpoint, Route } from './models/Endpoint'
import { validateInput } from './validateInput'
import { HttpMethod } from './models/HttpMethod'
import { SuccessResponse } from './models/SuccessResponse'
import { ErrorResponse } from './models/ErrorResponse'
import { RouterAuthConfig } from './models/RouterAuthConfig'
import { BaseResponse } from './models/BaseResponse'
import { OSError } from '../error'
import { buildExpressLogger } from '../logger/buildExpressLogger'

export interface ExpressRouterContext {
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    router: express.Router,
    authorization: {
        id: string, roles: string[], username: string,
    }
}

export const createRouterExpress = (authConfig: RouterAuthConfig = {}) => {
    const expressRouter = express.Router()
    const lookupRouterGlob = process.cwd() + '/**/*.router.js'
    const lookupRouteGlob = process.cwd() + '/**/*.route.js'
    const routerFilesPaths: string[] = glob.sync(lookupRouterGlob) || []
    const endpointFilesPaths: string[] = glob.sync(lookupRouteGlob) || []

    routerFilesPaths.forEach(addRouterToExpress(expressRouter))
    endpointFilesPaths.forEach(addEndpointToExpress(expressRouter, authConfig))

    return expressRouter
}

const addRouterToExpress = (expressRouter: express.Router) => (routerFilePath: string) => {
    const module = require(routerFilePath)
    const isRouter = module.default instanceof Router

    if (!isRouter) {
        getLogger().warn(`Skiping the following file as it does not export an instance of Router by default:
            ${routerFilePath}`)
        return
    }

    const router = module.default as Router

    router.routes.forEach(addSingleRouteToExpress(expressRouter, router))
}

const addSingleRouteToExpress = (expressRouter: express.Router, router: Router) => async (route: Route) => {
    expressRouter[ route.method ](`/${router.basePath}/${route.path}`,
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {

            // Validate inputs
            await validateObject(route.body, req.body)
            await validateObject(route.params, req.params)
            await validateObject(route.query, req.query)

            const response = await route.handler({
                body: req.body,
                query: req.query,
                params: req.params,
                logger: getLogger(), // TODO route-specific getLogger
            }, {
                req, res, next, router: expressRouter,
            } as ExpressRouterContext)

            res.json(response)
        })
}

const addEndpointToExpress = (expressRouter: express.Router, authConfig: RouterAuthConfig) => (filePath: string) => {
    const module = require(filePath)
    const isEndpoint = module.default instanceof Endpoint

    if (!isEndpoint) {
        getLogger().warn(`Router: Skiping the following file as it does not export an instance of Endpoint by default:
            ${filePath}`)
        return
    }
    const endpoint = module.default as Endpoint<any>

    const authorizationFunction = getAuthorizationFunction(endpoint, authConfig)

    expressRouter[ endpoint.method || HttpMethod.GET ](`/${endpoint.service.basePath}/${endpoint.path}`,
        authorizationFunction,
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const logger = buildExpressLogger(req)
            logger.info('Request initiated')
            const context: ExpressRouterContext = {
                req, res, next, router: expressRouter, authorization: req.user, ...authConfig.context,
            }
            try {
                // Validate inputs
                await validateObject(endpoint.body, req.body)

                // Authorize endpoint
                await authorizeEndpoint(endpoint, (req.user || {}).roles)

                const response = await endpoint.handler({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                    logger,
                }, context)

                sendSuccessResponse(res, response, logger)
            } catch (e) {
                sendErrorResponse(res, e, logger)
            }
        })
}

const getAuthorizationFunction = (endpoint: Endpoint<any>, authConfig: RouterAuthConfig) => {
    const defaultFunction = (req: express.Request, res: express.Response, next: express.NextFunction) => next()
    if (!endpoint.service.allowRoles.length
        && !endpoint.allowRoles.length
        && !endpoint.service.denyRoles.length
        && !endpoint.denyRoles.length) {
        return defaultFunction
    }
    return authConfig.authorizerMiddleware || defaultFunction
}

const authorizeEndpoint = async (endpoint: Endpoint<any>, userRoles: string[] = []) => {
    let isAuthorized = false
    const allowedRoles: string[] = [ ...endpoint.service.allowRoles, ...(endpoint.allowRoles || []) ]
        .filter(filterUnique())
    const deniedRoles: string[] = [ ...endpoint.service.denyRoles, ...(endpoint.denyRoles || []) ]
        // endpoint allowed roles take precedence over service denied ones
        .filter(filterOutIntersection(endpoint.allowRoles || []))

    if (userRoles.some((role) => deniedRoles.indexOf(role) >= 0)) {
        isAuthorized = false
    } else if (!allowedRoles.length) {
        isAuthorized = true
    } else {
        isAuthorized = userRoles.some((role) => allowedRoles.indexOf(role) >= 0)
    }
    if (!isAuthorized) {
        throw new OSError(
            'Unauthorized',
            'The user does not have the necessary permissions to access this resource',
            401,
        )
    }
}

const filterUnique = () => (item: string, index: number, self: string[]) => {
    return self.indexOf(item) === index
}

const filterOutIntersection = (input: string[]) => (item: string, index: number, self: string[]) => {
    return input.indexOf(item) <= 0
}

const validateObject = async (validateClass?: new () => any, validateObjct?: any) => {
    if (validateClass && validateObjct) {
        await validateInput(validateObjct, validateClass)
    }
}

const sendSuccessResponse = (res: express.Response, response: any, logger: Logger) => {
    logger.info('Request replied successful response')
    if (response instanceof SuccessResponse) {
        appendHeaders(response, res)
            .status(response.statusCode)
            .json({ data: response.body })
    } else {
        res.json({ data: response })
    }
}

const sendErrorResponse = (res: express.Response, e: any, logger: Logger) => {
    logger.error('Request replied error response: ' + e.stack)
    if (e instanceof ErrorResponse) {
        appendHeaders(e, res)
            .status(e.statusCode || 400)
            .json({ error: e.body })
    } else if (e instanceof OSError) {
        res.status(e.httpCode || 400)
            .json({
                error: { type: e.type, devMessage: e.devMessage, stackTrace: e.stack }
            })
    } else {
        res.status(400).json({
            error: 'UnknownError',
            devMessage: {
                error: e.message,
                stackTrace: e.stack,
            }
        })
    }
}

const appendHeaders = (response: BaseResponse, res: express.Response) => {
    Object.keys(response.headers || {}).forEach((header) => {
        res.append(header, response.headers[header])
    })
    return res
}
