export interface EndpointInput<
    Body = any | undefined,
    Params = any | undefined,
    Query = any | undefined> {

    body: Body
    params: Params
    query: Query
    meta?: {
        req: Express.Request
        res: Express.Response
    }
    logger: {
        info: (input: string) => void
        warn: (input: string) => void
        error: (input: string) => void
    }
}
