import { Auth } from '../models/Auth'

export interface AuthorizerDataSourceJWT {
    findUserById(id: string): Promise<Auth>
    findUserByUsername(username: string): Promise<Auth>
}
