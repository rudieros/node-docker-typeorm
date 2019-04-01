import { User } from '../../models/User'
import { AuthDataSource } from '../../common/authorizer/dataSources/AuthDataSource'

export class GetUserUseCase {
    constructor(
        private authDataSource: AuthDataSource,
    ) {}

    async exec(id: string): Promise<User> {
        return this.authDataSource.findUserById(id) as any
    }
}
