import { IsString } from 'class-validator'
import { UserService } from './service/user.service'
import { Service } from '../../common/router/decorators/Service'
import { Path } from '../../common/router/decorators/Path'
import { Body } from '../../common/router/decorators/Body'
import { Endpoint } from '../../common/router/models/Endpoint'
import { User } from '../../models/User'
import { HttpMethod } from '../../common/router/models/HttpMethod'

export class CreateUserBody {
    @IsString()
    name: string
    @IsString()
    email: string
}

// @Service(UserService)
// @Path('/')
// export default class CreateUserEndpoint {
//     exec(
//         @Body(CreateUserBody) body: CreateUserBody,
//     ) {
//         return
//     }
// }

export default new Endpoint<User, CreateUserBody>(async (
    { body }, { userId }) => {
    console.log('Body', body)
    return body as User
})
    .method(HttpMethod.POST)
    .service(UserService)
    .path('/')
