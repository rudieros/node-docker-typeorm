import express, { Application } from 'express'
import glob from 'glob'
import { Router } from './models/Router'
import { logger } from '../logger/logger'
import { Endpoint, Route } from './models/Endpoint'
import { validateInput } from './validateInput'
import { HttpMethod } from './models/HttpMethod'
import { SuccessResponse } from './models/SuccessResponse'
import { ErrorResponse } from './models/ErrorResponse'
import { RouterAuthConfig } from './models/RouterAuthConfig'

export interface ExpressRouterContext {
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    router: express.Router,
}

export const createRouterExpress = (authConfig?: RouterAuthConfig) => {
    const expressRouter = express.Router()
    const lookupRouterGlob = process.cwd() + '/**/*.router.js'
    const lookupRouteGlob = process.cwd() + '/**/*.route.js'
    const routerFilesPaths: string[] = glob.sync(lookupRouterGlob) || []
    const endpointFilesPaths: string[] = glob.sync(lookupRouteGlob) || []

    routerFilesPaths.forEach(addRouterToExpress(expressRouter))
    endpointFilesPaths.forEach(addEndpointToExpress(expressRouter))

    return expressRouter
}

const addRouterToExpress = (expressRouter: express.Router) => (routerFilePath: string) => {
    const module = require(routerFilePath)
    const isRouter = module.default instanceof Router

    if (!isRouter) {
        logger.warn(`Skiping the following file as it does not
            export an instance of Router by default: ${routerFilePath}`)
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
                logger, // TODO toResponse route-specific logger
            }, {
                req, res, next, router: expressRouter,
            } as ExpressRouterContext)

            res.json(response)
        })
}

const addEndpointToExpress = (expressRouter: express.Router) => (filePath: string) => {
    const module = require(filePath)
    const isEndpoint = module.default instanceof Endpoint

    if (!isEndpoint) {
        logger.warn(`Skiping the following file as it does not
            export an instance of Endpoint by default: ${filePath}`)
        return
    }

    const endpoint = module.default as Endpoint<any>
    expressRouter[ endpoint.method || HttpMethod.GET ](`/${endpoint.service.basePath}/${endpoint.path}`,
        async (req: express.Request, res: express.Response) => {
            try {
                // Validate inputs
                await validateObject(endpoint.body, req.body)

                const response = await endpoint.handler({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                    logger, // TODO toResponse route-specific logger
                }, {})

                sendSuccessResponse(res, response)
            } catch (e) {
                sendErrorResponse(res, e)
            }
        })
}

const validateObject = async (validateClass?: new () => any, validateObjct?: any) => {
    if (validateClass && validateObjct) {
        await validateInput(validateObjct, validateClass)
    }
}

const sendSuccessResponse = (res: express.Response, response: any) => {
    if (response instanceof SuccessResponse) {
        res.status(response.statusCode).json({ data: response.body })
    } else {
        res.json({ data: response })
    }
}

const sendErrorResponse = (res: express.Response, e: any) => {
    console.log('Instance of error', e instanceof ErrorResponse)
    if (e instanceof ErrorResponse) {
        res.status(e.statusCode).json({ e: e.body })
    } else {
        res.json(e)
    }
}
