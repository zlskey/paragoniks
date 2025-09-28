import { Router } from 'express'
import { validationController } from 'src/controllers'
import wrapAsync from 'src/utils/wrap-async'

const router = Router()

router.post('/is-username-or-email-taken', wrapAsync(validationController.handleCheckIfUsernameOrEmailIsTaken))
router.post('/is-username-taken', wrapAsync(validationController.handleCheckIfUsernameIsTaken))
router.post('/is-email-taken', wrapAsync(validationController.handleCheckIfEmailIsTaken))

export default router
