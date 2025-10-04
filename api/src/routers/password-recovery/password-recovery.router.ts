import { Router } from 'express'
import { passwordRecoveryController } from 'src/controllers'
import { authMiddleware } from 'src/middlewares'
import wrapAsync from 'src/utils/wrap-async'

const router = Router()

router.post('/send-email', wrapAsync(passwordRecoveryController.handleSendPasswordRecoveryEmail))
router.post('/verify-code', wrapAsync(passwordRecoveryController.handlePasswordRecoveryCode))
router.post('/update-password', authMiddleware.authorizeCookie, wrapAsync(passwordRecoveryController.handleUpdatePassword))

export default router
