import { EndpointMeta } from './EndpointMeta'

export const Body: (body: new () => any) => ParameterDecorator = (body: new () => any) => (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
) => {
    const metaRouter: EndpointMeta = { ...(target.metaRouter || {}), body: { body, parameterIndex } }
    target.metaRouter = metaRouter
}
