import { Router } from 'express'
import { handleRegisterPushToken, handleSendTestNotification } from 'src/controllers/notification.controller'
import authMiddleware from 'src/middlewares/auth.middleware'

const router = Router()

// All notification routes require authentication
router.use(authMiddleware)

router.post('/register-token', handleRegisterPushToken)
router.post('/test', handleSendTestNotification)

export default router
