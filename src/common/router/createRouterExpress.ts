import express from 'express'
import glob from 'glob'
import { Router } from './models/Router'
import { logger } from '../logger/logger'
import { Endpoint, Route } from './models/Endpoint'
import { validateInput } from './validateInput'

export const createRouterExpress = () => {
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
        async (req: express.Request, res: express.Response) => {

            // Validate inputs
            await validateObject(route.body, req.body)
            await validateObject(route.params, req.params)
            await validateObject(route.query, req.query)

            const response = await route.handler({
                body: req.body,
                query: req.query,
                params: req.params,
                logger, // TODO build route-specific logger
            }, {})

            res.json(response)
        })
}

const addEndpointToExpress = (expressRouter: express.Router) => (filePath: string) => {
    const module = require(filePath)
    const isRouter = module.default instanceof Endpoint
    console.log('Heyy', module.default.metaRouter)

    // if (!isRouter) {
    //     logger.warn(`Skiping the following file as it does not
    //         export an instance of Endpoint by default: ${filePath}`)
    //     return
    // }
    //
    // const endpoint = module as Endpoint

    // expressRouter[ endpoint.method ](`/${router.basePath}/${route.path}`,
    //     async (req: express.Request, res: express.Response) => {
    //
    //         // Validate inputs
    //         await validateObject(route.body, req.body)
    //         await validateObject(route.params, req.params)
    //         await validateObject(route.query, req.query)
    //
    //         const response = await route.handler({
    //             body: req.body,
    //             query: req.query,
    //             params: req.params,
    //             logger, // TODO build route-specific logger
    //         }, {})
    //
    //         res.json(response)
    //     })
}

const validateObject = async (validateClass?: new () => any, validateObjct?: any) => {
    if (validateClass && validateObjct) {
        await validateInput(validateObjct, validateClass)
    }
}
