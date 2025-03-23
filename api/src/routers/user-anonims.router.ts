import { Router } from 'express'
import { userAnonimsController } from 'src/controllers'
import { wrapAsync } from 'src/utils'

const userAnonimsRouter = Router()

userAnonimsRouter.post('/', wrapAsync(userAnonimsController.createAnonim))
userAnonimsRouter.delete('/', wrapAsync(userAnonimsController.removeAnonim))
userAnonimsRouter.get('/', wrapAsync(userAnonimsController.getAllUserAnonims))

export default userAnonimsRouter
