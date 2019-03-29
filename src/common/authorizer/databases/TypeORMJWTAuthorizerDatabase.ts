import { Auth } from '../models/Auth'
import { AuthorizerDataSourceJWT } from '../dataSources/AuthorizerDataSourceJWT'

export class TypeORMJWTAuthorizerDatabase implements AuthorizerDataSourceJWT {
    constructor() { // TODO receive TypeORM object

    }

    async findUserByUsername<T extends Auth>(username: string): Promise<Auth> {
        console.log('Uhu', username)
        return {
            username: 'user@email.com',
            password: 'hash',
            roles: ['User'],
        }
    }

    async findUserById(id: string): Promise<Auth> {
        console.log('Uhu', id)
        return {
            username: 'user@email.com',
            password: 'hash',
            roles: ['User'],
        }
    }
}
