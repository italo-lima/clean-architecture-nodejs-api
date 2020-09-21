const bcrypt = require('bcryptjs')

class Encrypter {
  async compare (password, hashedPassword) {
    const isValid = bcrypt.compare(password, hashedPassword)

    return isValid
  }
}

describe('Encrypter', () => {
  test('Should return true if bcrypt returns true', async () => {
    const sut = new Encrypter()
    const isValid = await sut.compare('any_password', 'hashed_password')
    expect(isValid).toBe(true)
  })

  test('Should return false if bcrypt returns false', async () => {
    const sut = new Encrypter()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_password', 'hashed_password')
    expect(isValid).toBe(false)
  })

  test('Should call bcrypt with correct values', async () => {
    const sut = new Encrypter()
    await sut.compare('any_password', 'hashed_password')
    expect(bcrypt.password).toBe('any_password')
    expect(bcrypt.hashedPassword).toBe('hashed_password')
  })
})
