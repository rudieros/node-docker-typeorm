import { Handler } from '../../common/router/models/Handler'

export const me: Handler = async ({
    body,
}) => {
    console.log('Body arrived!', body)
    return {
        user: '',
    }
}
