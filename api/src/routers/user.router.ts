import { Router } from 'express'
import { userController } from '../controllers'
import { wrapAsync } from '../utils'

const userRouter = Router()

userRouter.patch('/username', wrapAsync(userController.handleChangeUsername))

userRouter.patch('/password', wrapAsync(userController.handleChangePassword))

userRouter.patch('/theme', wrapAsync(userController.handleToggleTheme))

userRouter.patch(
  '/avatar/color',
  wrapAsync(userController.handleChangeAvatarColor)
)

userRouter.patch(
  '/avatar/image',
  wrapAsync(userController.handleChangeAvatarImage)
)

userRouter.get('/profile', wrapAsync(userController.handleGetProfiles))

export default userRouter
