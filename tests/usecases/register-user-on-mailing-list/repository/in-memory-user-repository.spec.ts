import { InMemoryUserRepository } from '../../../../src/usecases/register-user-on-mailing-list/repository/in-memory-user-repository'
import { UserData } from '../../../../src/entities/user-data'

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const sut = new InMemoryUserRepository(users)
    const user = await sut.findUserByEmail('any@email.com')
    expect(user).toBeNull()
  })

  test('Should return user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name = 'any_name'
    const email = 'any@email.com'
    const sut = new InMemoryUserRepository(users)
    await sut.add({ name, email })
    const user = await sut.findUserByEmail('any@email.com')
    expect(user.name).toBe('any_name')
  })

  test('should return all users in repository', async () => {
    const users: UserData[] = [
      { name: 'first_name', email: 'first@email.com' },
      { name: 'second_name', email: 'second@email.com' }
    ]

    const sut = new InMemoryUserRepository(users)
    const returnedUsers = sut.findAllUsers()
    expect((await returnedUsers).length).toBe(2)
  })
})
