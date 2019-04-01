// tslint:disable-next-line
require('source-map-support').install()

import { TypeORMAuthDatabase } from './common/authorizer/preAvailableDatabases/TypeORMAuthDatabase'
import { expressUseJwtAuth } from './common/authorizer/expressUseJwtAuth'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { createRouterExpress } from './common/router/createRouterExpress'
import {setupDatabase} from './common/database/setup'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

setupDatabase() // TODO wait for connection?

// Add JWT authentication, MUST BE BEFORE ROUTER
const authorizerMiddleware = expressUseJwtAuth(app, new TypeORMAuthDatabase({}), {
    usernameField: 'email',
})

const router = createRouterExpress({ authorizerMiddleware })

app.use(router)

app.listen(8000, () => {
    console.log('Server is ready!')
})
