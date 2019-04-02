// tslint:disable-next-line
require('source-map-support').install()

import { appContext } from './applicationContext'
import { expressUseJwtAuth } from './common/authorizer/expressUseJwtAuth'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import path from 'path'
import { createRouterExpress } from './common/router/createRouterExpress'
import { setupDatabase } from './common/database/setup'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// Add JWT authentication, MUST BE BEFORE ROUTER
const authorizerMiddleware = expressUseJwtAuth()

const router = createRouterExpress({ authorizerMiddleware, context: appContext })

router.get('/swagger', express.static(path.join(__dirname, 'swagger')))

app.use(router)

// setupDatabase() // TODO wait for connection?

app.listen(8000, () => {
    console.log('Server is ready!')
})
