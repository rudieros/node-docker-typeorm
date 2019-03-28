import { Route } from './Endpoint'

export class Router {
    public basePath: string
    public allowRoles?: string[]
    public denyRoles?: string[]
    public routes: Route[]

    constructor({
                    basePath,
                    allowRoles,
                    denyRoles,
                    routes,
                }: Router) {
        this.basePath = basePath
        this.routes = routes
        this.allowRoles = allowRoles
        this.denyRoles = denyRoles
    }
}
