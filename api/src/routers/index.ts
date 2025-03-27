import { Router } from 'express'
import { authMiddleware } from '../middlewares'
import authRouter from './auth.router'
import friendRouter from './friend.router'
import receiptRouter from './receipt.router'
import statusRouter from './status.router'
import uploadsRouter from './uploads.router'
import userAnonimsRouter from './user-anonims.router'
import userRouter from './user.router'

const router = Router()

router.use('/dev', statusRouter)
router.use('/auth', authRouter)
router.use('/uploads', uploadsRouter)
router.use('/user', authMiddleware, userRouter)
router.use('/receipt', authMiddleware, receiptRouter)
router.use('/friend', authMiddleware, friendRouter)
router.use('/anonim', authMiddleware, userAnonimsRouter)

export default router
