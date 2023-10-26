import { Router } from 'express'
import { friendController } from '../controllers'
import { wrapAsync } from '../utils'

const friendRouter = Router()

friendRouter.get('/', wrapAsync(friendController.getFriendsProfiles))
friendRouter.delete(
  '/:username',
  wrapAsync(friendController.handleRemoveFriend)
)

export default friendRouter
