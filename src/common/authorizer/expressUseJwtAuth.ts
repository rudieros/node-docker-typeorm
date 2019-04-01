import { Application } from 'express'
import { AuthDataSource } from './dataSources/AuthDataSource'
import express from 'express'
import passport from 'passport'
import { passportJWTStrategy } from './passportJWTStrategy'

export interface ExpressJwtAuthConfig {
    usernameField?: string
    passwordField?: string
}

const defaultExpressJwtAuthConfig = {
    loginRoute: '/login',
    usernameField: 'username',
    passwordField: 'password',
}

export type ExpressUseJwtAuth = (app: Application, authDataSource: AuthDataSource, config: ExpressJwtAuthConfig) =>
    (req: express.Request, res: express.Response, next: express.NextFunction) => any

export const expressUseJwtAuth: ExpressUseJwtAuth = (
    app: Application,
    authDataSource: AuthDataSource,
    config: ExpressJwtAuthConfig = defaultExpressJwtAuthConfig,
) => {
    passport.use(passportJWTStrategy(authDataSource))

    return passport.authenticate('jwt', { session: false })
}
