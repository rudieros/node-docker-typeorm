import { LocalAuthenticatorDataSource } from '../dataSources/LocalAuthenticator'
import express from 'express'
import passport from 'passport'

export class PassportLocalAuthenticator implements LocalAuthenticatorDataSource {
    constructor(private input: { req: express.Request, res: express.Response, next: express.NextFunction }) {}

    authenticate(username: string, password: string): Promise<any> {
        const { req, res, next } = this.input
        return new Promise((resolve, reject) => {
            passport.authenticate('local', { session: false }, (err, usr) => {
                if (err) {
                    return reject(err)
                }
                resolve(usr)
            })(req, res, next)
        })
    }
}
