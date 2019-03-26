import { Router } from '../../_common/router/models/Router'
import { HttpMethod } from '../../_common/router/models/HttpMethod'
import { me } from './me'

export default new Router({
    basePath: 'users',
    routes: [
        {
            path: 'me',
            method: HttpMethod.GET,
            handler: me,
        }
    ]
})
