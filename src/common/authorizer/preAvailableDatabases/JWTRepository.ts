import { TokenDataSource } from '../dataSources/TokenDataSource'
import jwt from 'jsonwebtoken'

export class JWTRepository implements TokenDataSource {

    createToken(user: any): Promise<string> {
        return Promise.resolve(jwt.sign(user, 'outsmart')) // TODO use actual keys
    }

    validateToken(token: string): Promise<any> {
        return Promise.resolve(jwt.verify(token, 'outsmart')) // TODO use actual keys
    }
}
