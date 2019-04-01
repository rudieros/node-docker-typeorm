import { Endpoint } from '../../common/router/models/Endpoint'
import { HttpMethod } from '../../common/router/models/HttpMethod'
import { User } from '../../models/User'
import { ApplicationContext } from '../../applicationContext'
import { UserService } from './service/user.service'
import { GetUserUseCase } from '../core/getUserUseCase'

export default new Endpoint({
    handler: async ({ body }, { authorization: { id } }: ApplicationContext) => {
        const useCase = new GetUserUseCase()
        return useCase.exec(id)
    },
    method: HttpMethod.GET,
    service: UserService,
    path: 'me',
    response: User,
    denyRoles: ['User']
})
