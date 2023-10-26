import { Router } from 'express'
import { authMiddleware } from '../middlewares'
import authRouter from './auth.router'
import friendRouter from './friend.router'
import userRouter from './user.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', authMiddleware, userRouter)
router.use('/friend', authMiddleware, friendRouter)

export default router
