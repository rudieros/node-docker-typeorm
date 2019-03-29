import { AuthorizerDataSourceJWT } from './dataSources/AuthorizerDataSourceJWT'
import { Strategy as LocalStrategy, IStrategyOptions } from 'passport-local'

export const passportLocalStrategy = (authorizer: AuthorizerDataSourceJWT, config: {
    usernameField: string,
    passwordField: string,
}) => {
    const options: IStrategyOptions = {
        usernameField: config.usernameField,
        passwordField: config.passwordField,
    }
    return new LocalStrategy(options, (username, password, callback) => {
        console.log('Will call')
        callback(null, { user: true })
        // try {
        //     console.log('Will find user')
        //     const user = await authorizer.findUserByUsername(username)
        //     console.log('User', user)
        //     if (!user) {
        //         callback('User not found', false)
        //     } else {
        //         callback(null, user)
        //     }
        // } catch (e) {
        //     callback(e, false, { message: `Error getting user: ${e}`})
        // }
    })
}
