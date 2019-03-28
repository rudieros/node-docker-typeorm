import express from 'express'
import { createRouterExpress } from './common/router/createRouterExpress'

const app = express()

const router = createRouterExpress()

app.use(router)

app.listen(8000, () => {
    console.log('Server is ready!')
})
