import { Router } from 'express'
import { authMiddleware } from '../middlewares'
import authRouter from './auth.router'
import userRouter from './user.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', authMiddleware, userRouter)

export default router
