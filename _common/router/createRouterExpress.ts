import express from 'express'
import glob from 'glob'
import { Router } from './models/Router'
import { logger } from '../logger/logger'
import { Route } from './models/Route'

export const createRouterExpress = () => {
    const expressRouter = express.Router()
    const lookupGlob = process.cwd() + '/**/*.router.js'
    const routerFilesPaths: string[] = glob.sync(lookupGlob) || []

    routerFilesPaths.forEach(addRouterToExpress(expressRouter))

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

    router.routes.forEach(addSingleRoute(expressRouter, router))
}

const addSingleRoute = (expressRouter: express.Router, router: Router) => (route: Route) => {
    // TODO validate inputs, and validate route config
    expressRouter[route.method](`/${router.basePath}/${route.path}`, async (req: express.Request, res: express.Response) => {
        const response = await route.handler({
            body: req.body,
            query: req.query,
            params: req.params,
            logger, // TODO build route-specific logger
        }, {})

        res.json(JSON.stringify(response))
    })
}
