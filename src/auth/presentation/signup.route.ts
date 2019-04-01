import { Endpoint } from '../../common/router/models/Endpoint'
import { HttpMethod } from '../../common/router/models/HttpMethod'
import { AuthService } from './service/AuthService'
import { IsEmail, IsString } from 'class-validator'
import { User } from '../../models/User'
import { ApplicationContext } from '../../applicationContext'
import { SuccessResponse } from '../../common/router/models/SuccessResponse'
import { TypeORMAuthDatabase } from '../../common/authorizer/preAvailableDatabases/TypeORMAuthDatabase'
import { LocalSignUpUseCase } from '../../common/authorizer/useCases/LocalSignUpUseCase'
import { Auth } from '../../common/authorizer/models/Auth'
import { SecurePasswordValidator } from '../../common/authorizer/preAvailableDatabases/SecurePasswordValidator'
import { JWTRepository } from '../../common/authorizer/preAvailableDatabases/JWTRepository'
import { BcryptPasswordValidator } from '../../common/authorizer/preAvailableDatabases/BcryptPasswordValidator'

export class SignUpBody {
    @IsEmail()
    email: string
    @IsString()
    password: string
}

export default new Endpoint({
    handler: async ({ body }, { repos }: ApplicationContext) => {
        const useCase = new LocalSignUpUseCase(
            repos.getAuthRepo(),
            repos.getPasswordValidatorRepo(),
            repos.getPasswordPolicyVerifierRepo(),
            repos.getJwtRepo(),
        )

        const { token, auth } = await useCase.exec({
            ...body,
            username: body.email,
            roles: ['User'], // TODO extract roles
        })

        return new SuccessResponse(auth).setHeaders({ token })
    },
    method: HttpMethod.POST,
    service: AuthService,
    path: 'sign-up',
    body: SignUpBody,
    response: Auth,
})
