import { Router } from 'express'
import { authController } from 'src/controllers'
import { authMiddleware } from 'src/middlewares'
import wrapAsync from 'src/utils/wrapAsync'

const router = Router()

router.post('/is-username-or-email-taken', wrapAsync(authController.handleCheckIfUsernameOrEmailIsTaken))
router.post('/is-username-taken', wrapAsync(authController.handleCheckIfUsernameIsTaken))
router.post('/is-email-taken', wrapAsync(authController.handleCheckIfEmailIsTaken))

router.post('/signup', wrapAsync(authController.signup))
router.post('/login', wrapAsync(authController.login))

// email confirmation
router.post('/confirm-email', wrapAsync(authController.handleConfirmEmail))

// password recovery
router.post('/password-recovery/send-email', wrapAsync(authController.handleSendPasswordRecoveryEmail))
router.post('/password-recovery/verify-code', wrapAsync(authController.handlePasswordRecoveryCode))
router.post('/password-recovery/update-password', authMiddleware, wrapAsync(authController.handleUpdatePassword))

router.post('/login/google', wrapAsync(authController.loginWithGoogle))

router.get('/logout', authMiddleware, wrapAsync(authController.logout))

router.get('/whoami', wrapAsync(authController.whoami))

export default router
