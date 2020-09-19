const { MissingParamError, InvalidParamError } = require('../../utils/errors')
const AuthUseCase = require('./auth-usecase')

const makeSut = () => {
  class LoadUserByEmailRepository {
    async load (email) {
      this.email = email
    }
  }

  const loadUserByEmailRepository = new LoadUserByEmailRepository()
  const sut = new AuthUseCase(loadUserByEmailRepository)

  return {
    sut, loadUserByEmailRepository
  }
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth()

    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth('valid_email@email.com')

    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { loadUserByEmailRepository } = makeSut()
    const sut = new AuthUseCase(loadUserByEmailRepository)
    await sut.auth('valid_email@email.com', 'any_password')

    expect(loadUserByEmailRepository.email).toBe('valid_email@email.com')
  })

  test('Should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('valid_email@email.com', 'valid_password')

    expect(promise).rejects.toThrow(new MissingParamError('loadUserByEmailRepository'))
  })

  test('Should throw if no LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth('valid_email@email.com', 'valid_password')

    expect(promise).rejects.toThrow(new InvalidParamError('loadUserByEmailRepository'))
  })

  test('Should return null if LoadUserByEmailRepository reuturns null', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('invalid_email@email.com', 'invalid_password')

    expect(accessToken).toBeNull()
  })
})
