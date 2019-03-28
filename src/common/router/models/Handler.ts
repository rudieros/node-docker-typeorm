import { EndpointInput } from './EndpointInput'
import { SuccessResponse } from './SuccessResponse'

export type Handler<ResponseBody = any, InputBody = any, Params = any, Query = any> =
    (
        input: EndpointInput<InputBody, Params, Query>,
        context: any,
    ) => ResponseBody | Promise<ResponseBody> | Promise<SuccessResponse<ResponseBody>>
