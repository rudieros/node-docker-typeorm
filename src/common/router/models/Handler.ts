import { EndpointInput } from './EndpointInput'

export type Handler<ResponseBody = any, InputBody = any, Params = any, Query = any> =
    (
        input: EndpointInput<InputBody, Params, Query>,
        context: any,
    ) => ResponseBody | Promise<ResponseBody>
