const HttpRequest = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
      return HttpRequest.serverError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpRequest.badRequest('email')
    } else if (!password) {
      return HttpRequest.badRequest('password')
    }

    this.authUseCase.auth(email, password)

    return HttpRequest.unauthorizedError()
  }
}
