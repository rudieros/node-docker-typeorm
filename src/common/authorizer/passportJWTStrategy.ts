import { AuthorizerDataSourceJWT } from './dataSources/AuthorizerDataSourceJWT'
import { Strategy as JwtStrrategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt'

export const passportJWTStrategy = (authorizer: AuthorizerDataSourceJWT) => {
    const options: StrategyOptions = {
        issuer: 'appsimples',
        audience: 'appsimples',
        secretOrKey: 'outsmart', // TODO replace with actual keys
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    return new JwtStrrategy(options, async (jwt, done: VerifiedCallback) => {
        try {
            console.log('Will find user')
            const user = await authorizer.findUserById(jwt.sub)
            console.log('User', user)
            if (!user) {
                done('User not found', false)
            } else {
                done(null, user)
            }
        } catch (e) {
            done(e, false)
        }
    })
}
