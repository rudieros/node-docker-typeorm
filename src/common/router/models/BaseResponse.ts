export class BaseResponse {
  public body: string = ''
  public headers: { [key: string]: any } = {}
  public statusCode: number = 200

  public setStatusCode(code: number) {
    this.statusCode = code
    return this
  }

  protected getCorsHeaders() {
    return {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    }
  }

  public toResponse() {
    return {
      statusCode: this.statusCode,
      headers: this.headers,
      body: this.body,
    }
  }

  public static checkIfInstance(object: any) {
    return object.statusCode
  }
}
