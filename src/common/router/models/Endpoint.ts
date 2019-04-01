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
    allowRoles: string[] = []
    denyRoles: string[] = []

    constructor(input: {
        path: string,
        body?: new () => Body,
        method?: HttpMethod,
        service: Service,
        handler: Handler<ResponseBody, Body, Params, Query>,
        response?: new () => ResponseBody,
        allowRoles?: string[],
        denyRoles?: string[],
    }) {
        this.body = input.body
        this.path = input.path
        this.method = input.method
        this.service = input.service
        this.handler = input.handler
        this.response = input.response
        this.allowRoles = input.allowRoles || this.allowRoles
        this.denyRoles = input.denyRoles || this.denyRoles
    }
}
