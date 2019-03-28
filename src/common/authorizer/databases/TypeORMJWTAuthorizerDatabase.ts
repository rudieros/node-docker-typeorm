import { AuthorizerDataSourceJWT } from '../dataSources/AuthorizerDataSourceJWT'
import { Auth } from '../models/Auth'

export class TypeORMJWTAuthorizerDatabase implements AuthorizerDataSourceJWT {
    constructor() { // TODO receive TypeORM object

    }

    findUserById(id: string): Auth {
        return {
            email: 'user@email.com',
            password: 'hash'
        }
    }
}
