import { Service as ServiceModel } from '../models/Service'

export const Service: (service: ServiceModel) => ClassDecorator = (service: ServiceModel) => (target: any) => {
    target.metaRouter = { ...(target.metaRouter || {}), service }
}
