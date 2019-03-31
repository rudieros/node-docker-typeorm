import { Auth } from '../models/Auth'
import { AuthDataSource } from '../dataSources/AuthDataSource'

export interface TypeORMAuthDatabaseConfig {
    usernameField?: string
}

export class TypeORMAuthDatabase implements AuthDataSource {
    constructor(
        private config: TypeORMAuthDatabaseConfig,
    ) { // TODO receive TypeORM object and config

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
