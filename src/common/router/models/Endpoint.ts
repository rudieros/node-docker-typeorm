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
    httpMethod: HttpMethod = HttpMethod.GET
    serviceParent: Service
    endpointPath: string
    inputBody: new () => Body
    response: new () => ResponseBody
    allowedRoles: string[]

    constructor(
        private handler: Handler<ResponseBody, Body, Params, Query>
    ) {}

    method(method: HttpMethod) {
        this.httpMethod = method
        return this
    }
    service(service: Service) {
        this.serviceParent = service
        return this
    }
    path(path: string) {
        this.endpointPath = path
        return this
    }
    body(body: new () => Body, options?: InputOptions) {
        this.inputBody = body
    }
    allowRoles(allowedRoles: string[]) {
        this.allowedRoles = allowedRoles
        return this
    }

}
