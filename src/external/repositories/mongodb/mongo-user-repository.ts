import { UserData } from '../../../entities'
import { UserRepository } from '../../../usecases/register-user-on-mailing-list/ports'
import { MongoHelper } from './helper'

export class MongodbUserRepository implements UserRepository {
  async add (user: UserData): Promise<void> {
    const userColletion = MongoHelper.getCollection('users')
    const exists = await this.exists(user)
    if (!exists) {
      await userColletion.insertOne(user)
    }
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const userColletion = MongoHelper.getCollection('users')
    const result = await userColletion.findOne({ email })
    return result
  }

  async findAllUsers (): Promise<UserData[]> {
    return await MongoHelper.getCollection('users').find().toArray()
  }

  async exists (user: UserData): Promise<boolean> {
    const result = await this.findUserByEmail(user.email)
    return !!result
  }
}
