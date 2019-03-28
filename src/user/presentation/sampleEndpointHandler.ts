import { Handler } from '../../common/router/models/Handler'
import { IsString } from 'class-validator'
import { User } from '../../models/User'

export const sampleEndpointHandler: Handler<SampleEndpointBody, User> = async ({
                                      body,
                                  }, { req }) => {
    console.log('Body arrived!', body)
    return new User()
}

export class SampleEndpointBody {
    @IsString()
    name: string
    @IsString()
    email: string
}

export class SampleEndpointParams {
    id: string
}
