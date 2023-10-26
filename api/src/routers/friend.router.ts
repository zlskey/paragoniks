import { Router } from 'express'
import { friendController } from 'src/controllers'
import { wrapAsync } from 'src/utils'

const friendRouter = Router()

friendRouter.patch('/', wrapAsync(friendController.handleCreateFriendRequest))
friendRouter.delete(
  '/:username',
  wrapAsync(friendController.handleRemoveFriend)
)
friendRouter.patch(
  '/respond',
  wrapAsync(friendController.handleRespondToFriendRequest)
)

export default friendRouter
