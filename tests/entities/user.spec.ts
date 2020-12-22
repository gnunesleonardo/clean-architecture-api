import { InvalidEmailError } from '../../src/entities/errors/invalid-email-error'
import { User } from '../../src/entities/user'
import { left } from '../../src/shared/either'

describe('User domain class', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any_name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })
})
