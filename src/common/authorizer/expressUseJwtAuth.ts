import { Application } from 'express'
import { AuthDataSource } from './dataSources/AuthDataSource'
import { passportLocalStrategy } from './passportLocalStrategy'
import passport from 'passport'

export interface ExpressJwtAuthConfig {
    usernameField?: string
    passwordField?: string
}

const defaultExpressJwtAuthConfig = {
    loginRoute: '/login',
    usernameField: 'username',
    passwordField: 'password',
}

export const expressUseJwtAuth = (
    app: Application,
    authDataSource: AuthDataSource,
    config: ExpressJwtAuthConfig = defaultExpressJwtAuthConfig,
) => {

    // Add local login with username and password strategy
    passport.use(passportLocalStrategy(authDataSource, {
        usernameField: config.usernameField || defaultExpressJwtAuthConfig.usernameField,
        passwordField: config.passwordField || defaultExpressJwtAuthConfig.passwordField,
    }))
    // passport.use('local', new Strategy({
    //     usernameField: 'email',
    //     passwordField: 'password',
    // }, (username, password, callback) => {
    //     console.log('Callback here')
    //     callback(null, { user: true })
    // }))

    // add jwt authentication
    // passport.use(passportJWTStrategy(authDataSource))
    // app.post(
    //     config.loginRoute || defaultExpressJwtAuthConfig.loginRoute,
    //     passport.authenticate('jwt', { session: false }),
    //     (req, res) => {
    //         console.log('Called here user', req.user)
    //     }
    // )
}
