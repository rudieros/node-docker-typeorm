import { Service } from '../../../common/router/models/Service'

export const UserService = new Service({
    name: 'Usuário',
    basePath: 'users',
    description: 'Description',
    allowRoles: ['User'],
})
