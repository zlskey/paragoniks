import { Router } from 'express'
import { authMiddleware } from '../middlewares'
import authRouter from './auth.router'
import friendRouter from './friend.router'
import receiptRouter from './receipt.router'
import userRouter from './user.router'
import uploadsRouter from './uploads.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/uploads', uploadsRouter)
router.use('/user', authMiddleware, userRouter)
router.use('/receipt', authMiddleware, receiptRouter)
router.use('/friend', authMiddleware, friendRouter)

export default router
