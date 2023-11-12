import { Router } from 'express'
import { friendController } from 'src/controllers'
import { wrapAsync } from 'src/utils'

const friendRouter = Router()

friendRouter.get('/', wrapAsync(friendController.defaultFriendController))

friendRouter.post(
  '/',
  wrapAsync(friendController.handleCreateFriendshipRequest),
  wrapAsync(friendController.defaultFriendController)
)

friendRouter.delete(
  '/:friendId',
  wrapAsync(friendController.handleRemoveFriend),
  wrapAsync(friendController.defaultFriendController)
)

friendRouter.patch(
  '/respond',
  wrapAsync(friendController.handleRespondToFriendRequest),
  wrapAsync(friendController.defaultFriendController)
)

export default friendRouter
