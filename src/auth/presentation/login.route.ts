import { Endpoint } from '../../common/router/models/Endpoint'
import { HttpMethod } from '../../common/router/models/HttpMethod'
import { AuthService } from './service/AuthService'
import { IsEmail, IsString } from 'class-validator'
import { User } from '../../models/User'
import { ApplicationContext } from '../../applicationContext'
import { LocalLoginUseCase } from '../../common/authorizer/useCases/LocalLoginUseCase'
import { JWTRepository } from '../../common/authorizer/preAvailableDatabases/JWTRepository'
import { SuccessResponse } from '../../common/router/models/SuccessResponse'
import { PassportLocalAuthenticator } from '../../common/authorizer/preAvailableDatabases/PassportLocalAuthenticator'

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
            new PassportLocalAuthenticator({ req, res, next }),
        )

        const { token, user, } = await useCase.exec()

        return new SuccessResponse(user).setHeaders({
            token,
        })
    },
    method: HttpMethod.POST,
    service: AuthService,
    path: 'login',
    body: LoginBody,
    response: User,
})
