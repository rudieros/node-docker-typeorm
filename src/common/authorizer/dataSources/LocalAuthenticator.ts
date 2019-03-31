export interface LocalAuthenticatorDataSource {
    authenticate(username?: string, password?: string): Promise<any>
}
