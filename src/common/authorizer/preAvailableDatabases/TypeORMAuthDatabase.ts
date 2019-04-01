import { Auth } from '../models/Auth'
import { AuthDataSource } from '../dataSources/AuthDataSource'
import { NoId } from '../types/NoIdType'

export interface TypeORMAuthDatabaseConfig {
    usernameField?: string
}

export class TypeORMAuthDatabase implements AuthDataSource {
    constructor(private config: TypeORMAuthDatabaseConfig) { // TODO receive TypeORM object and config
    }

    async authenticate(username: string, password: string): Promise<Auth> {
        let error
        const user = await this.findUserByUsername<Auth>(username).catch((e) => error = e)
        console.log('Error!')
        if (!user) {
            throw new Error('A user with the given username could not be found').name = 'UserNotFound'
        }
        return user
    }

    async findUserByUsername<T extends Auth>(username: string): Promise<Auth> {
        return {
            id: 'abc',
            username: 'user@email.com',
            password: '$2b$10$.JtprXripq2uy78oqudiguA1aFjmDFe0HDHfoomdlNB3P491ENVea',
            roles: ['User'],
        }
    }

    async findUserById(id: string): Promise<Auth> {
        return {
            id: 'abc',
            username: 'user@email.com',
            password: 'hash',
            roles: ['User'],
        }
    }

    async createUser(user: NoId<Auth>, password: string): Promise<any> {
        return { ...user, id: 'abc' }
    }
}
