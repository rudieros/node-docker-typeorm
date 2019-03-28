export class Service {
    constructor(
        public name: string,
        public basePath: string,
        public description?: string,
        public allowedRolles?: string[]
    ) {}
}
