import { Router } from '../../common/router/models/Router'
import { HttpMethod } from '../../common/router/models/HttpMethod'
import { SampleEndpointBody, sampleEndpointHandler } from './sampleEndpointHandler'

export default new Router({
    basePath: 'users',
    routes: [
        {
            path: 'sample',
            method: HttpMethod.POST,
            body: SampleEndpointBody,
            handler: sampleEndpointHandler,

        },
    ]
})
