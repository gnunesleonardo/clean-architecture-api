import { UserData } from '../entities'
import { UseCase } from '../usecases/ports'
import { MissingParamError } from './errors'
import { HttpRequest, HttpResponse } from './ports'
import { badRequest, created, serverError } from './util/http-helper'

export class RegisterUserController {
  private readonly usecase: UseCase

  constructor (usecase: UseCase) {
    this.usecase = usecase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.name || !request.body.email) {
        let missingParam: string = ''

        if (!request.body.name && !request.body.email) {
          missingParam = 'name and email'
        } else if (!request.body.name) {
          missingParam = 'name'
        } else {
          missingParam = 'email'
        }

        return badRequest(new MissingParamError(missingParam))
      }

      const userData: UserData = request.body
      const response = await this.usecase.perform(userData)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      if (response.isRight()) {
        return created(response.value)
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
