// import { Authorization } from '../../authorizer/models/Authorization'
import { BaseResponse } from './BaseResponse'

export class SuccessResponse<OutputBody> extends BaseResponse {
  public body: any
  constructor(public response: OutputBody,
              // public authorization?: Authorization,
              headers?: any,
              public statusCode = 200) {
    super()
    this.setHeaders(headers)
    this.body = this.response
  }

  public setResponse = (response: any) => {
    this.response = response
  }

  public setHeaders = (headers: any) => {
    this.headers = {
      ...headers,
    }
  }

  // public setAuthorization = (authorization: Authorization) => {
  //   this.authorization = authorization
  //   this.setBody()
  // }
}
