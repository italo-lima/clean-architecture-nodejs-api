const bcrypt = require('bcryptjs')

module.exports = class Encrypter {
  async compare (password, hashedPassword) {
    const isValid = bcrypt.compare(password, hashedPassword)

    return isValid
  }
}
