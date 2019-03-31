import { AuthDataSource } from './dataSources/AuthDataSource'
import { IStrategyOptions, Strategy as LocalStrategy } from 'passport-local'

export const passportLocalStrategy = (authorizer: AuthDataSource, config: {
    usernameField: string,
    passwordField: string,
}) => {
    const options: IStrategyOptions = {
        usernameField: config.usernameField,
        passwordField: config.passwordField,
    }
    return new LocalStrategy(options, async (username, password, callback) => {
        callback(null, { user: true })
        try {
            const user = await authorizer.findUserByUsername(username)
            if (!user) {
                callback('User not found', false)
            } else {
                callback(null, user)
            }
        } catch (e) {
            callback(e, false, { message: `Error getting user: ${e}`})
        }
    })
}
