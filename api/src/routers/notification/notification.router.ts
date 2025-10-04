import { Router } from 'express'
import { notificationController } from 'src/controllers'
import { authMiddleware } from 'src/middlewares'

const router = Router()

// All notification routes require authentication
router.use(authMiddleware.authorizeCookie)

router.post('/token', notificationController.handleRegisterPushToken)

export default router
