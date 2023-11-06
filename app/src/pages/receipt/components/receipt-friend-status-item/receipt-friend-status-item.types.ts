import { Receipt, User } from 'src/types/generic.types'

export interface ReceiptFriendStatusItemProps {
  username: User['username']
  receipt: Receipt
}
