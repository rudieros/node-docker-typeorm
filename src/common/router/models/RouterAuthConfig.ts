import express from 'express'

export interface RouterAuthConfig {
    authorizerMiddleware?: (req: express.Request, res: express.Response, next: express.NextFunction) => any
    context?: any
}
