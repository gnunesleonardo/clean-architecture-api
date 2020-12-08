import { UserData } from '../user-data'

export interface UserRepository {
  add(user: UserData): Promise<void>
  findUserByEmail(email: string): Promise<UserData>
  finAllUsers(): Promise<UserData[]>
  exists(user: UserData): Promise<boolean>
}
