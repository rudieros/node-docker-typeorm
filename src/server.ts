// tslint:disable-next-line
require('source-map-support').install()

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { createRouterExpress } from './common/router/createRouterExpress'
import {setupDatabase} from './common/database/setup'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const router = createRouterExpress()

app.use(router)

setupDatabase() // TODO wait for connection?

app.listen(8000, () => {
    console.log('Server is ready!')
})
