export interface PasswordPolicyVerifier {
    verifyPassword(password: string): Promise<{ valid: boolean, reasons?: string[] }>
}
