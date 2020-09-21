const bcrypt = require('bcryptjs')
const MissingParamError = require('../errors/missing-param-error')

module.exports = class Encrypter {
  async compare (password, hashedPassword) {
    if (!password) {
      throw new MissingParamError('password')
    } else if (!hashedPassword) {
      throw new MissingParamError('hashedPassword')
    }

    const isValid = bcrypt.compare(password, hashedPassword)

    return isValid
  }
}
