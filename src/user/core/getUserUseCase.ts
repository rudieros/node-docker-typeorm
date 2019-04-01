import { User } from '../../models/User'

export class GetUserUseCase {
    constructor() {}

    async exec(id: string): Promise<User> {
        return {
            name: 'Rudi',
            email: 'rudierosdfr@gmail.com',
        }
    }
}
