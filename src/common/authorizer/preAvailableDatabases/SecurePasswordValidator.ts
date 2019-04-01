import { PasswordValidator } from '../dataSources/PasswordValidator'

// tslint:disable-next-line
const securePassword = require('secure-password') // Lib doesn't have typings
const pwd = securePassword()

export class SecurePasswordValidator implements PasswordValidator {

    async hashPassword(password: string): Promise<string> {
        const buf = Buffer.from(password)
        const hash = await pwd.hash(buf)
        console.log(`\nHash here for pass ${password}`, hash.toString())
        return hash
    }

    async verifyPassword(hash: string, password: string): Promise<void> {
        console.log(`\nWill verify pass ${password} for hash ${hash}`)
        const passwordBuf = Buffer.from(password)
        const hashBuf = Buffer.from(hash)
        console.log('\nHash buf bytes', hashBuf.byteLength)
        const result = await pwd.verify(passwordBuf, hashBuf)

        switch (result) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
                return console.error('This hash was not made with secure-password. Attempt legacy algorithm')
            case securePassword.INVALID:
                return console.log('Invalid password')
            case securePassword.VALID:
                return console.log('Authenticated')
            case securePassword.VALID_NEEDS_REHASH:
                console.log('Yay you made it, wait for us to improve your safety')
        }
    }
}
