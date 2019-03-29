import { Application } from 'express'
import { passportJWTStrategy } from './passportJWTStrategy'
import { AuthorizerDataSourceJWT } from './dataSources/AuthorizerDataSourceJWT'
import { passportLocalStrategy } from './passportLocalStrategy'
import { PassportStatic } from 'passport'
import { Strategy } from 'passport-local'

export interface ExpressJwtAuthConfig {
    loginRoute?: string
    usernameField?: string
    passwordField?: string
}

const defaultExpressJwtAuthConfig = {
    loginRoute: '/login',
    usernameField: 'username',
    passwordField: 'password',
}

export const expressUseJwtAuth = (
    passport: PassportStatic,
) => {

    // Add local login with username and password strategy
    // passport.use(passportLocalStrategy(authDataSource, {
    //     usernameField: config.usernameField || defaultExpressJwtAuthConfig.usernameField,
    //     passwordField: config.passwordField || defaultExpressJwtAuthConfig.passwordField,
    // }))
    passport.use(new Strategy((username, password, callback) => {
        console.log('Callback here')
        callback(null, { user: true })
    }))

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
