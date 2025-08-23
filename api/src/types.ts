import type * as SharedTypes from '@paragoniks/shared/dist/index'
import type { Types } from 'mongoose'

export * from '@paragoniks/shared/dist/index'

export type UserId = Types.ObjectId
export type ProductId = Types.ObjectId
export type ReceiptId = Types.ObjectId
export type FriendId = Types.ObjectId
export type FriendshipId = Types.ObjectId

// Override _id fields to be ObjectId instead of unknown
export interface User extends SharedTypes.User {
  _id: UserId
  password?: string
  googleId?: string
}

export interface Anonim extends SharedTypes.Anonim {
  _id: UserId
  ownerId: UserId
}

export interface Profile extends SharedTypes.Profile {
  _id: UserId
  ownerId?: UserId
}

export interface Friendship extends SharedTypes.Friendship {
  _id: FriendshipId
  friendId: UserId
  secondFriendId: UserId
}

export interface Product extends SharedTypes.Product {
  _id: ProductId
}

export interface Receipt extends SharedTypes.Receipt {
  _id: ReceiptId
  owner: UserId
  products: Product[]
}

export interface ScanCount extends SharedTypes.ScanCount {
  _id: UserId
  userId: UserId
}
