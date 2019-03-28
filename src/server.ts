// tslint:disable-next-line
require('source-map-support').install()
import express from 'express'
import { createRouterExpress } from './common/router/createRouterExpress'
import {setupDatabase} from './common/database/setup'

const app = express()

const router = createRouterExpress()

setupDatabase()

app.use(router)

app.listen(8000, () => {
    console.log('Server is ready!')
})
