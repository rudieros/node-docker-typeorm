export interface RouterAuthConfig {
    routes: Array<{
        path: string
        public: boolean
        allowedRoles: string[]
    }>
}
