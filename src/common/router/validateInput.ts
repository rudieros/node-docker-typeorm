import { validate } from 'class-validator'
import { OSError } from '../error'
import { RouterErrorTypes } from './errors'

export const validateInput = async <T> (input: any, model: new () => T) => {
    const output: any = new model()
    Object.keys(input).forEach((inputKey) => {
        output[inputKey] = input[inputKey]
    })
    const unMutatedOutput = { ...output }
    const errors = await validate(output, { whitelist: true })
    if (errors && errors.length) {
        throw new OSError(RouterErrorTypes.InvalidInput, errors.toString())
    }
    return Promise.resolve(unMutatedOutput as T)
}
