import { Router } from 'express'
import { scanCountController } from 'src/controllers'
import { wrapAsync } from 'src/utils'

const scanCountRouter = Router()

scanCountRouter.get('/', wrapAsync(scanCountController.handleGetScanCount))

export default scanCountRouter
