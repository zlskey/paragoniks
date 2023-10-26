import { Router } from 'express'
import friendRouter from './friend.router'
import { userController } from '../controllers'
import { wrapAsync } from '../utils'

const userRouter = Router()

userRouter.patch('/password', wrapAsync(userController.changePassword))
userRouter.patch('/username', wrapAsync(userController.changeUsername))
userRouter.use('/friend', friendRouter)

export default userRouter
