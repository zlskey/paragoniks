import { Router } from 'express'
import authRouter from './auth'
import friendRouter from './friend'
import notificationRouter from './notification'
import passwordRecoveryRouter from './password-recovery'
import receiptRouter from './receipt'
import scanCountRouter from './scan-count'
import statusRouter from './status'
import uploadsRouter from './uploads'
import userRouter from './user'
import userAnonimsRouter from './user-anonims'
import validationRouter from './validation'

const router = Router()

router.use('/dev', statusRouter)
router.use('/auth', authRouter)
router.use('/password-recovery', passwordRecoveryRouter)
router.use('/uploads', uploadsRouter)
router.use('/user', userRouter)
router.use('/receipt', receiptRouter)
router.use('/friend', friendRouter)
router.use('/anonim', userAnonimsRouter)
router.use('/scanCount', scanCountRouter)
router.use('/notification', notificationRouter)
router.use('/validation', validationRouter)

export default router
