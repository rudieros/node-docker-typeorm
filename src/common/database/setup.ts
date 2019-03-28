import 'reflect-metadata'
import { createConnection, getConnectionOptions } from 'typeorm'

export const setupDatabase = async (isTest?: boolean) => {
    const connectionOptions = await getConnectionOptions(isTest ? 'test' : 'dev')
    await createConnection({ ...connectionOptions, name: 'default' }).catch((e) => console.log(e))
}
