import { EndpointInput } from './EndpointInput'

export type Handler<InputBody = any, Params = any, Query = any, ResponseBody = any> =
    (
        input: EndpointInput<InputBody, Params, Query>,
        context: any,
    ) => ResponseBody | Promise<ResponseBody>
