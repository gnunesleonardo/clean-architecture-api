import { Either, left, right } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'

export class Email {
  public readonly value: string

  private constructor (email: string) {
    this.value = email
  }

  static create (email: string): Either<InvalidEmailError, Email> {
    if (Email.validate(email)) {
      return right(new Email(email))
    }

    return left(new InvalidEmailError(email))
  }

  static validate (email: string): boolean {
    if (!email || email.length > 320) {
      return false
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(email)) {
      return false
    }

    const [local, domain] = email.split('@')
    if (local.length > 64 || domain.length > 255) {
      return false
    }

    if (!local.length || !domain.length) {
      return false
    }

    const domainParts = domain.split('.')
    if (domainParts.some(part => part.length > 63)) {
      return false
    }

    return true
  }
}
