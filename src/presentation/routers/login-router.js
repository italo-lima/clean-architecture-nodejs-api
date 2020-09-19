const HttpRequest = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpRequest.badRequest('email')
      } else if (!password) {
        return HttpRequest.badRequest('password')
      }

      const accessToken = await this.authUseCase.auth(email, password)

      if (!accessToken) {
        return HttpRequest.unauthorizedError()
      }

      return HttpRequest.ok({ accessToken })
    } catch {
      return HttpRequest.serverError()
    }
  }
}
