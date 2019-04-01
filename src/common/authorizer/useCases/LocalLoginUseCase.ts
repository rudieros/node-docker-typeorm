import { TokenDataSource } from '../dataSources/TokenDataSource'
import { AuthDataSource } from '../dataSources/AuthDataSource'
import { PasswordValidator } from '../dataSources/PasswordValidator'
import { OSError } from '../../error'
import { Auth } from '../models/Auth'
import { NoPassword } from '../types/NoPasswordType'

export class LocalLoginUseCase {

    constructor(
        private tokenDataSource: TokenDataSource,
        private authDataSource: AuthDataSource,
        private passwordValidator: PasswordValidator,
    ) {}

    async exec(username: string, password: string): Promise<{ token: string, auth: NoPassword<Auth> }> {
        const authResult = await this.authDataSource.findUserByUsername(username)
        console.log('Result in use case', authResult)

        if (!authResult) {
            throw new OSError('UserNotFound', 'Could not find user with given username in the database')
        }
        const { password: storedPassword, ...auth } = authResult

        await this.passwordValidator.verifyPassword(storedPassword, password).catch((e) => {
            throw new OSError('Unauthorized', `Error validating password: ${e}`, 401)
        })

        const token = await this.tokenDataSource.createToken(auth)

        return { auth, token }
    }

}
