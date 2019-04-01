import { TokenPayload } from '../models/TokenPayload'

export interface TokenDataSource {
    createToken(payload: TokenPayload): Promise<string>
    validateToken(token: string): Promise<TokenPayload>
}
