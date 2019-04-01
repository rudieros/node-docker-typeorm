export interface PasswordValidator {
    hashPassword(password: string): Promise<string>
    verifyPassword(hash: string, password: string): Promise<void>
}
