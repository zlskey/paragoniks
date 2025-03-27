import { Router } from 'express'
import { statusController } from 'src/controllers'
import wrapAsync from 'src/utils/wrapAsync'

const router = Router()

router.get('/healthcheck', wrapAsync(statusController.healthCheck))

export default router
