export const defaultTemplate = (tag: string) => `[OS_LOGGER_${tag} - ${new Date().toISOString()}] -\n`

export interface Logger {
    info: (message: string) => void
    warn: (message: string) => void
    error: (message: string) => void
}

export const getLogger = (template = defaultTemplate) => ({
    info: (message: any) => {
        console.log(colors.fg.Cyan, template('INFO'), colors.Reset, message)
    },
    warn: (message: any) => {
        console.log(colors.fg.Yellow, template('WARNING'), colors.Reset, message)
    },
    error: (message: any) => {
        console.log(colors.fg.Red, template('ERROR'), colors.Reset, message)
    },
})

const colors = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',
    fg: {
        Black: '\x1b[30m',
        Red: '\x1b[31m',
        Green: '\x1b[32m',
        Yellow: '\x1b[33m',
        Blue: '\x1b[34m',
        Magenta: '\x1b[35m',
        Cyan: '\x1b[36m',
        White: '\x1b[37m',
        Crimson: '\x1b[38m'
    },
    bg: {
        Black: '\x1b[40m',
        Red: '\x1b[41m',
        Green: '\x1b[42m',
        Yellow: '\x1b[43m',
        Blue: '\x1b[44m',
        Magenta: '\x1b[45m',
        Cyan: '\x1b[46m',
        White: '\x1b[47m',
        Crimson: '\x1b[48m'
    }
}
