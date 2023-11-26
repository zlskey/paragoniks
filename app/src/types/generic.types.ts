import { Locale } from 'src/helpers/i18n/i18n.types'

export interface RsApiError {
  message: string
  code: number
}

export enum AvatarColor {
  Red = '#ff9800',
  Blue = '#f44336',
  Green = '#2196f3',
  Yellow = '#4caf50',
  Pink = '#ffeb3b',
  Purple = '#e91e63',
  Orange = '#9c27b0',
  Default = 'default',
}

export type UserId = string
export type FriendId = UserId
export type ContributorId = UserId
export type ProductId = string
export type ReceiptId = string
export type FriendshipId = string

export interface User {
  _id: UserId
  username: string
  theme: 'light' | 'dark'
  avatarColor: AvatarColor
  avatarImage: string
  lang: Locale
}

export interface Profile {
  _id: UserId
  username: string
  avatarColor: AvatarColor
  avatarImage: string
}

export interface Friendship {
  _id: FriendshipId
  friendId: UserId
  status: 'accepted' | 'pending'
}

export interface Product {
  _id: ProductId
  comprising: UserId[]
  name: string
  price: number
  count: number
}

export interface SimpleReceipt {
  sum: number
  title: string
  products: Product[]
}

export interface Receipt extends SimpleReceipt {
  _id: ReceiptId
  owner: UserId
  contributors: UserId[]
  imagePath: string
  createdAt: string
  updatedAt: string
}
