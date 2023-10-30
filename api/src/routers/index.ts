import { Router } from 'express'
import { authMiddleware } from '../middlewares'
import authRouter from './auth.router'
import receiptRouter from './receipt.router'
import userRouter from './user.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', authMiddleware, userRouter)
router.use('/receipt', authMiddleware, receiptRouter)

export default router
