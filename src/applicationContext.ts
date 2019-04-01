import { ExpressRouterContext } from './common/router/createRouterExpress'
import { getRepository } from 'typeorm'
import { TypeORMAuthDatabase } from './common/authorizer/preAvailableDatabases/TypeORMAuthDatabase'
import { JWTRepository } from './common/authorizer/preAvailableDatabases/JWTRepository'
import { BcryptPasswordValidator } from './common/authorizer/preAvailableDatabases/BcryptPasswordValidator'
import { Auth } from './common/database/models/auth'

export const appContext = {
    repos: {
        getJwtRepo: () => new JWTRepository(),
        getPasswordValidatorRepo: () => new BcryptPasswordValidator(),
        getPasswordPolicyVerifierRepo: () => ({ verifyPassword: () => Promise.resolve({ valid: true }) }), // TODO add real policy,
        getAuthRepo: () => new TypeORMAuthDatabase(getRepository(Auth)),
    }
}

export type ApplicationContext = typeof appContext & ExpressRouterContext
