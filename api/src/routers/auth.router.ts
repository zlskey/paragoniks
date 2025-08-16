import { Router } from 'express'
import { authController } from 'src/controllers'
import { authMiddleware } from 'src/middlewares'
import wrapAsync from 'src/utils/wrapAsync'

const router = Router()

router.get('/is-username-taken', wrapAsync(authController.handleCheckIfUsernameIsTaken))
router.post('/signup', wrapAsync(authController.signup))
router.post('/login', wrapAsync(authController.login))
router.get('/logout', authMiddleware, wrapAsync(authController.logout))

router.get('/whoami', wrapAsync(authController.whoami))

export default router
