import express from 'express'
import passport from 'passport'
import { passportJWTStrategy } from './passportJWTStrategy'

export type ExpressUseJwtAuth = () =>
    (req: express.Request, res: express.Response, next: express.NextFunction) => any

export const expressUseJwtAuth: ExpressUseJwtAuth = (
) => {
    passport.use(passportJWTStrategy())

    return passport.authenticate('jwt', { session: false })
}
