export class Service {
    public name: string
    public basePath: string
    public description?: string
    public allowRoles: string[] = []
    public denyRoles: string[] = []
    constructor(input: {
        name: string,
        basePath: string,
        description?: string,
        allowRoles?: string[],
        denyRoles?: string[],
    }) {
        this.name = input.name
        this.basePath = input.basePath
        this.description = input.description
        this.allowRoles = input.allowRoles || this.allowRoles
        this.denyRoles = input.denyRoles || this.denyRoles
    }
}
