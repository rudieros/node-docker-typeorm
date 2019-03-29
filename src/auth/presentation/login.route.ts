import { Endpoint } from '../../common/router/models/Endpoint'
import { HttpMethod } from '../../common/router/models/HttpMethod'
import { AuthService } from './service/AuthService'
import { IsEmail, IsString } from 'class-validator'
import { User } from '../../models/User'
import { ApplicationContext } from '../../applicationContext'
import { passportInstance } from '../../server'

export class LoginBody {
    @IsEmail()
    email: string
    @IsString()
    password: string
}

export default new Endpoint({
    handler: async ({ body, }, { req, res, next, router }: ApplicationContext) => {
        await new Promise((resolve, reject) => {
            console.log('Called handler')
            passportInstance.authenticate('local', { session: false }, (err, user, info) => {
                console.log('Ha', user, req.login, info)
                resolve()
            })(req, res, next)
        })
    },
    method: HttpMethod.POST,
    service: AuthService,
    path: 'login',
    body: LoginBody,
    response: User,
})
