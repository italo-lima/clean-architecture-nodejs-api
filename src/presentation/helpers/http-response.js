const MissingParamError = require('./missing-param-errors')
const Unauthorizederror = require('./unauthorized-errors')

module.exports = class HttpRequest {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }

  static unauthorizedError () {
    return {
      statusCode: 401,
      body: new Unauthorizederror()
    }
  }
}
