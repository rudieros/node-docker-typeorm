export const Path: (path: string) => ClassDecorator = (path: string) => (target: any) => {
    target.metaRouter = { ...(target.metaRouter || {}), path }
}
