import { AuthDataSource } from './dataSources/AuthDataSource'
import { Strategy as JwtStrrategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt'

export const passportJWTStrategy = (authorizer: AuthDataSource) => {
    const options: StrategyOptions = {
        secretOrKey: 'outsmart', // TODO replace with actual keys
        jwtFromRequest: (req: any) => {
            return req.headers.Authorization || req.headers.authorization
        },
    }
    return new JwtStrrategy(options, async (jwt, done: VerifiedCallback) => {
        done(null, jwt)
    })
}
