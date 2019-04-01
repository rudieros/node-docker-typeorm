import { AuthDataSource } from '../dataSources/AuthDataSource'
import { Auth } from '../models/Auth'
import { PasswordValidator } from '../dataSources/PasswordValidator'
import { PasswordPolicyVerifier } from '../dataSources/PasswordPolicyVerifier'
import { OSError } from '../../error'
import { NoId } from '../types/NoIdType'
import { TokenDataSource } from '../dataSources/TokenDataSource'
import { NoPassword } from '../types/NoPasswordType'

export class LocalSignUpUseCase {
    constructor(
        private authDataSource: AuthDataSource,
        private passwordValidator: PasswordValidator,
        private passwordPolicyVerifier: PasswordPolicyVerifier,
        private tokenDataSource: TokenDataSource) {}

    async exec(user: NoId<Auth>): Promise<{ auth: NoPassword<Auth>, token: string }> {
        const { valid, reasons } = await this.passwordPolicyVerifier.verifyPassword(user.password)
        if (!valid) {
            throw new OSError('InvalidInputFormat', `Given password did not comply to policy: ${reasons}`)
        }

        const hashPassword = await this.passwordValidator.hashPassword(user.password)

        const { password, ...auth } = await this.authDataSource.createUser(user, hashPassword)
            .catch((e) => {
            throw new OSError('UnkownError', `Error creating user: ${e}`)
        })

        const token = await this.tokenDataSource.createToken(auth)

        return { auth, token }
    }
}
