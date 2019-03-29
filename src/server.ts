// tslint:disable-next-line
require('source-map-support').install()

import passport from 'passport'
import { TypeORMJWTAuthorizerDatabase } from './common/authorizer/databases/TypeORMJWTAuthorizerDatabase'
import { expressUseJwtAuth } from './common/authorizer/expressUseJwtAuth'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { createRouterExpress } from './common/router/createRouterExpress'
import {setupDatabase} from './common/database/setup'

export const passportInstance = passport

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const router = createRouterExpress()

app.use(router)
// Add JWT authentication, MUST BE BEFORE ROUTER
expressUseJwtAuth(passport)

setupDatabase() // TODO wait for connection?

app.listen(8000, () => {
    console.log('Server is ready!')
})
