import { Auth } from '../models/Auth'

export interface AuthDataSource {
    findUserById(id: string): Promise<Auth>
    findUserByUsername(username: string): Promise<Auth>
}
