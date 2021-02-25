import { MongoHelper } from '../../../../src/external/repositories/mongodb/helper'
import { MongodbUserRepository } from '../../../../src/external/repositories/mongodb'

describe('Mongodb User repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    MongoHelper.clearCollection('users')
  })

  test('When user is added, it should exist', async () => {
    const userRepository = new MongodbUserRepository()
    const user = {
      name: 'Any name',
      email: 'any@mail.com'
    }

    await userRepository.add(user)
    expect(await userRepository.exists(user)).toBeTruthy()
  })
})
