import { PasswordValidator } from '../dataSources/PasswordValidator'
import { hash as bcryptHash, compare as bcryptCompare } from 'bcrypt'

export class BcryptPasswordValidator implements PasswordValidator {
    constructor(
        private SALT_ROUNDS: number = 10,
    ) {}

    async hashPassword(password: string): Promise<string> {
        const hash = await bcryptHash(password, this.SALT_ROUNDS)
        return hash
    }

    async verifyPassword(hash: string, password: string): Promise<void> {
        const response = await bcryptCompare(password, hash)
        if (!response) {
            throw new Error('Invalid password at bcrypt compare function').name = 'InvalidPassword'
        }
    }
}
