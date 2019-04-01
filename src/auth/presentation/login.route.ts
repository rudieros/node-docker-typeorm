import { Endpoint } from '../../common/router/models/Endpoint'
import { HttpMethod } from '../../common/router/models/HttpMethod'
import { AuthService } from './service/AuthService'
import { IsEmail, IsString } from 'class-validator'
import { ApplicationContext } from '../../applicationContext'
import { LocalLoginUseCase } from '../../common/authorizer/useCases/LocalLoginUseCase'
import { JWTRepository } from '../../common/authorizer/preAvailableDatabases/JWTRepository'
import { SuccessResponse } from '../../common/router/models/SuccessResponse'
import { TypeORMAuthDatabase } from '../../common/authorizer/preAvailableDatabases/TypeORMAuthDatabase'
import { Auth } from '../../common/authorizer/models/Auth'
import { BcryptPasswordValidator } from '../../common/authorizer/preAvailableDatabases/BcryptPasswordValidator'

export class LoginBody {
    @IsEmail()
    email: string
    @IsString()
    password: string
}

export default new Endpoint({
    handler: async ({ body }, { req, res, next }: ApplicationContext) => {
        const useCase = new LocalLoginUseCase(
            new JWTRepository(),
            new TypeORMAuthDatabase({ usernameField: 'email' }), // TODO many places using this, find a good way to extract,
            new BcryptPasswordValidator(),
        )

        const { token, auth } = await useCase.exec(body.email, body.password)

        return new SuccessResponse(auth).setHeaders({ token })
    },
    method: HttpMethod.POST,
    service: AuthService,
    path: 'login',
    body: LoginBody,
    response: Auth,
})
