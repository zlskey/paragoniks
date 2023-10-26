import { Router } from 'express'
import { userController } from '../controllers'
import { wrapAsync } from '../utils'

const userRouter = Router()

userRouter.patch('/password', wrapAsync(userController.changePassword))
userRouter.patch('/username', wrapAsync(userController.changeUsername))

export default userRouter
