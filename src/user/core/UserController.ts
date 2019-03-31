import {getRepository, Repository} from 'typeorm'
import User from '../../common/database/models/user'

export class UserController {
    private userRepository: Repository<User>

    constructor() {
        this.userRepository = getRepository(User)
    }

    public async getUser(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id)
        if (!user) {
            throw new Error('Nao achou')
        }
        return user
    }

    public async createUser(user: User): Promise<User> {
        return this.userRepository.save(user)
    }
}
