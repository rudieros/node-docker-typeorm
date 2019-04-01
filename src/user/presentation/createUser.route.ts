import { IsString } from 'class-validator'
import { Endpoint } from '../../common/router/models/Endpoint'
import { UserService } from './service/user.service'
import { HttpMethod } from '../../common/router/models/HttpMethod'
import { User } from '../../models/User'

export class CreateUserBody {
    @IsString()
    name: string
    @IsString()
    email: string
}

export default new Endpoint({
    service: UserService,
    path: '/',
    method: HttpMethod.POST,
    body: CreateUserBody,
    response: User,
    handler: async ({ body }, { userId }) => {
        console.log('Body', body)
        return body
    },
})
