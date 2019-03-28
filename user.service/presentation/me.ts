import { Handler } from '../../_common/router/models/Handler'

export const me: Handler = async ({
    body,
}) => {
    console.log('Body arrived!', body)
    return {
        hey_man2: 'haaaaaa'
    }
}
