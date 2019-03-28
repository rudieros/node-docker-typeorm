import { Handler } from '../../common/router/models/Handler'
import {getRepository, Like} from 'typeorm'
import User from '../../common/database/models/user'

export const me: Handler = async ({
    body,
}, { req }) => {
    console.log('Body arrived!', body)

    const userRepository = getRepository(User)
    const user = await userRepository.findOne(1)

    return {
        user,
    }
}
