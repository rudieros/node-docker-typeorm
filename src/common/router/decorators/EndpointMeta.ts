import { Service } from '../models/Service'
import { HttpMethod } from '../models/HttpMethod'

export interface EndpointMeta {
    method?: HttpMethod
    service?: Service
    path?: string
    body?: new () => any
}
