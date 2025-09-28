import { Router } from 'express'
import { authController } from 'src/controllers'
import { authMiddleware } from 'src/middlewares'
import wrapAsync from 'src/utils/wrap-async'

const router = Router()

router.post('/is-username-or-email-taken', wrapAsync(authController.handleCheckIfUsernameOrEmailIsTaken))
router.post('/is-username-taken', wrapAsync(authController.handleCheckIfUsernameIsTaken))
router.post('/is-email-taken', wrapAsync(authController.handleCheckIfEmailIsTaken))

router.post('/signup', wrapAsync(authController.signup))
router.post('/login', wrapAsync(authController.login))

// email confirmation
router.post('/confirm-email', wrapAsync(authController.handleConfirmEmail))

router.post('/login/google', wrapAsync(authController.loginWithGoogle))

router.get('/logout', authMiddleware, wrapAsync(authController.logout))

router.get('/whoami', wrapAsync(authController.whoami))

export default router
