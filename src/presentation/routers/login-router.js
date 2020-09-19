const HttpRequest = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')
const InvalidParamError = require('../helpers/invalid-param-error')

module.exports = class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpRequest.badRequest(new MissingParamError('email'))
      } else if (!this.emailValidator.isValid(email)) {
        return HttpRequest.badRequest(new InvalidParamError('email'))
      } else if (!password) {
        return HttpRequest.badRequest(new MissingParamError('password'))
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
