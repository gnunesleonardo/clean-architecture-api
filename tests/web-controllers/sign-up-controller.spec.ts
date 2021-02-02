import { UserData } from '../../src/entities'
import { RegisterUserOnMailingList } from '../../src/usecases/register-user-on-mailing-list'
import { UserRepository } from '../../src/usecases/register-user-on-mailing-list/ports'
import { InMemoryUserRepository } from '../../src/usecases/register-user-on-mailing-list/repository'
import { HttpRequest, HttpResponse } from '../../src/web-controllers/ports'
import { RegisterUserController } from '../../src/web-controllers/register-user-controller'

describe('Register user web controller', () => {
  test('should return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any Name',
        email: 'any@mail.com'
      }
    }

    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })
})
