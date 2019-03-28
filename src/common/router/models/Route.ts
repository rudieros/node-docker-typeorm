import { HttpMethod } from './HttpMethod'
import { Handler } from './Handler'

export interface Route<
    InputBody = any | undefined,
    Params = any | undefined,
    Query = any | undefined,
    ResponseBody = any
    > {
    method: HttpMethod
    path: string
    input?: new() => InputBody
    allowRoles?: string[]
    denyRoles?: string[]
    handler: Handler<InputBody, Params, Query, ResponseBody>
}
