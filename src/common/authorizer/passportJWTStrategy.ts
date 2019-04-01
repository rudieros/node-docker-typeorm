import { Strategy as JwtStrrategy, StrategyOptions, VerifiedCallback } from 'passport-jwt'

export const passportJWTStrategy = () => {
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
