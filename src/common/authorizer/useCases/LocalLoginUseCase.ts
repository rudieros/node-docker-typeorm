import express from 'express'
import { TokenDataSource } from '../dataSources/TokenDataSource'
import { LocalAuthenticatorDataSource } from '../dataSources/LocalAuthenticator'

export interface PassportExpressLoginUseCaseInput {
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
}

export class LocalLoginUseCase {

    constructor(
        private tokenDataSource: TokenDataSource,
        private localAuthDataSource: LocalAuthenticatorDataSource,
    ) {}

    async exec() {
        const user = await this.localAuthDataSource.authenticate()

        const token = await this.tokenDataSource.createToken(user)

        return { user, token }
    }

}
