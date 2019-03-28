import { HttpMethod } from './HttpMethod'
import { Handler } from './Handler'
import { Service } from './Service'

export interface Route<
    Body = any | undefined,
    Params = any | undefined,
    Query = any | undefined,
    ResponseBody = any
    > {
    method: HttpMethod
    path: string
    body?: new () => Body
    params?: new () => Params
    query?: new () => Query
    allowRoles?: string[]
    denyRoles?: string[]
    handler: Handler<Body, Params, Query, ResponseBody>
}

export function Path(target: any) {
    console.log('Target', target)
}

export interface InputOptions {
    validate: boolean
}

export class Endpoint<ResponseBody, Body = undefined, Params = undefined, Query = undefined> {
    handler: Handler<ResponseBody, Body, Params, Query>
    method?: HttpMethod = HttpMethod.GET
    service: Service
    path?: string
    body?: new () => Body
    response?: new () => ResponseBody
    allowedRoles?: string[]

    constructor({
        path,
        body,
        method,
        service,
        handler,
        response,
                }: Endpoint<ResponseBody, Body, Params, Query>) {
        this.body = body
        this.path = path
        this.method = method
        this.service = service
        this.handler = handler
        this.response = response
    }

    // method(method: HttpMethod) {
    //     this.method = method
    //     return this
    // }
    // service(service: Service) {
    //     this.service = service
    //     return this
    // }
    // path(path: string) {
    //     this.path = path
    //     return this
    // }
    // body(body: new () => Body, options?: InputOptions) {
    //     this.body = body
    // }
    // allowRoles(allowedRoles: string[]) {
    //     this.allowedRoles = allowedRoles
    //     return this
    // }

}
