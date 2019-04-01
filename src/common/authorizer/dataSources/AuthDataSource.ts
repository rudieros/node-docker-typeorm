import { Auth } from '../models/Auth'
import { NoId } from '../types/NoIdType'

export interface AuthDataSource {
    authenticate(username?: string, password?: string): Promise<Auth>
    findUserById(id: string): Promise<Auth | undefined>
    findUserByUsername(username: string): Promise<Auth | undefined>
    createUser(user: NoId<Auth>, password: string): Promise<Auth>
}
