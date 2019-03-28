// import { Authorization } from '../../authorizer/models/Authorization'
import { ErrorDictionary, Lang, OSError } from '../../error'
import { BaseResponse } from './BaseResponse'

const nodeEnv = process.env.STAGE || process.env.NODE_ENV
const isDev = nodeEnv === 'dev' || nodeEnv === 'development'

export class ErrorResponse extends BaseResponse {

  public body: string
  public statusCode: number

  constructor(
    error: Error,
    // authorization: Authorization | undefined,
    errorDictionary: ErrorDictionary,
    language: Lang,
    ) {
    super()
    this.statusCode = 400
    let message = error.message || this.getDefaultErrorMessage(language)
    let devMessage
    let type = 'UnhandledError'
    if (error instanceof OSError) {
      if (isDev) {
        devMessage = error.devMessage || error.stack || error
      }
      type = error.type
      if (error.httpCode) {
        this.statusCode = error.httpCode
      }
      if (errorDictionary) {
        message = errorDictionary.get(language)[error.type] || message
      }
    } else if (isDev) {
      devMessage = error.stack
    }
    this.headers = super.getCorsHeaders()
    this.body = JSON.stringify({
      // authorization,
      error: {
        message,
        devMessage: `${devMessage}`,
        code: type,
      },
    })
  }

  private getDefaultErrorMessage = (lang: Lang) => {
    switch (lang) {
      case Lang.enUS: {
        return 'An unkown error has ocurred'
      }
      case Lang.ptBR: {
        return 'Ocorreu um erro desconhecido'
      }
    }
  }
}
