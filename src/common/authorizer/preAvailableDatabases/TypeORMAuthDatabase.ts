import { AuthDataSource } from '../dataSources/AuthDataSource'
import { NoId } from '../types/NoIdType'
import { Repository } from 'typeorm'
import { Auth } from '../models/Auth'
import uuid = require('uuid')

export class TypeORMAuthDatabase implements AuthDataSource {
    constructor(
        private repo: Repository<Auth>
    ) {}

    async authenticate(username: string, password: string): Promise<Auth> {
        let error
        const user = await this.findUserByUsername<Auth>(username).catch((e) => error = e)
        if (!user) {
            throw new Error('A user with the given username could not be found').name = 'UserNotFound'
        }
        return user
    }

    async findUserByUsername<T extends Auth>(username: string): Promise<Auth | undefined> {
        const results = await this.repo.find({ where: { username }})
        return results[0]
    }

    async findUserById(id: string): Promise<Auth | undefined> {
        const result = await this.repo.findOne(id)
        return result
    }

    async createUser(user: NoId<Auth>, password: string): Promise<any> {
        await this.repo.insert({ ...user, password, id: uuid.v4() })
        return user
    }
}
