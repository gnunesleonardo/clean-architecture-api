import { InvalidEmailError } from '../../src/entities/errors/invalid-email-error'
import { InvalidNameError } from '../../src/entities/errors/invalid-name-error'
import { User } from '../../src/entities/user'
import { left } from '../../src/shared/either'

describe('User domain class', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any_name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })

  test('should not create user with invalid name (too few chars)', () => {
    const invalidName = 'L          '
    const error = User.create({ name: invalidName, email: 'any@email.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should not create user with invalid name (too many chars)', () => {
    const invalidName = 'L'.repeat(257)
    const error = User.create({ name: invalidName, email: 'any@email.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })
})
