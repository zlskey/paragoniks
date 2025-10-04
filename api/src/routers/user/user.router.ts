import { Router } from 'express'
import { userController } from 'src/controllers'
import { authMiddleware } from 'src/middlewares'
import { wrapAsync } from 'src/utils'

const userRouter = Router()

userRouter.use(authMiddleware)

userRouter.patch('/username', wrapAsync(userController.handleChangeUsername))

userRouter.patch('/password', wrapAsync(userController.handleChangePassword))
userRouter.patch('/email', wrapAsync(userController.handleChangeEmail))
userRouter.patch('/email/resend', wrapAsync(userController.handleResendEmailConfirmation))
userRouter.patch('/theme', wrapAsync(userController.handleToggleTheme))

userRouter.patch(
  '/avatar/color',
  wrapAsync(userController.handleChangeAvatarColor),
)

userRouter.patch(
  '/avatar/image',
  wrapAsync(userController.handleChangeAvatarImage),
)

userRouter.get('/friends', wrapAsync(userController.handleGetFriends))

userRouter.get('/profile/:userId', wrapAsync(userController.handleGetProfile))

userRouter.patch('/lang/:lang', wrapAsync(userController.handleSetLang))
userRouter.patch('/meta', wrapAsync(userController.handleUpdateMeta))

export default userRouter
