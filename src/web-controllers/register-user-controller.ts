import { UserData } from '../entities'
import { RegisterUserOnMailingList } from '../usecases/register-user-on-mailing-list'
import { HttpRequest, HttpResponse } from './ports'
import { badRequest, created } from './util/http-helper'

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList

  constructor (usecase: RegisterUserOnMailingList) {
    this.usecase = usecase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = request.body
    const response = await this.usecase.registerUserOnMailingList(userData)

    if (response.isLeft()) {
      return badRequest(response.value)
    }

    if (response.isRight()) {
      return created(response.value)
    }
  }
}
