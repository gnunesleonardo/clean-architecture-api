import { Router } from 'express'
import { makeRegisterUserController } from '../../factories/register'
import { adaptRoute } from '../../config/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeRegisterUserController()))
}
