import { Auth } from '../models/Auth'

export interface AuthorizerDataSourceJWT {
    findUserById(id: string): Promise<any>
}
