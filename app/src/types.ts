import type * as SharedTypes from '@paragoniks/shared/dist/index.js'

export * from '@paragoniks/shared/dist/index.js'

export type UserId = string
export type ProductId = string
export type ReceiptId = string
export type FriendId = string
export type FriendshipId = string

export interface User extends SharedTypes.User {
  _id: UserId
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
