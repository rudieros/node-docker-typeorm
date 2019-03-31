export interface TokenDataSource {
    createToken(user: any): Promise<string>
    validateToken(token: string): Promise<any>
}
