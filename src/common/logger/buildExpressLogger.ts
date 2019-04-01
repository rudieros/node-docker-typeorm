import express from 'express'
import { defaultTemplate, getLogger } from './logger'

export const buildExpressLogger = (req: express.Request) => { // TODO add random request id
    return getLogger((tag) =>
        `${defaultTemplate(tag)}  endpoint: ${req.path}
        ${req.user && `user_id: ${(req.user || {}).id}
        username: ${(req.user || {}).username}\n` || ''}`)
}
