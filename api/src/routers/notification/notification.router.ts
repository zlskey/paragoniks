import { Router } from 'express'
import { notificationController } from 'src/controllers'
import authMiddleware from 'src/middlewares/auth.middleware'

const router = Router()

// All notification routes require authentication
router.use(authMiddleware)

router.post('/register-token', notificationController.handleRegisterPushToken)
router.post('/test', notificationController.handleSendTestNotification)

export default router
