const template = (info: string) => `[LOGGER - ${new Date().toTimeString()}] ${info}`
export const logger = {
    info: (message: any) => {
        console.log('\x1b[34m', template(message))
    },
    warn: (message: any) => {
        console.log('\x1b[43m', template(message))
    },
    error: (message: any) => {
        console.log('\x1b[41m', template(message))
    },
}
