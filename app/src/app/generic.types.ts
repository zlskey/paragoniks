export interface ApiError {
  message: string
  code: number
}

export enum AvatarColor {
  Red = '#f44336',
  Blue = '#1976d2',
  Green = '#4caf50',
  Pink = '#c2185b',
  Purple = '#7b1fa2',
  Orange = '#e65100',
  Default = 'default',
}

export type UserId = string
export type ProductId = string
export type ReceiptId = string
export type FriendshipId = string

export interface UserMeta {
  media_quality_warning_accepted?: boolean
}

export interface User {
  _id: UserId
  username: string
  avatarColor: AvatarColor
  avatarImage: string
  meta?: UserMeta
}

export interface Anonim extends User {
  ownerId: UserId
}

export interface Profile extends User {
  ownerId?: UserId
}

export interface Friendship {
  _id: FriendshipId
  friendId: UserId
  status: 'accepted' | 'pending'
}

export type DivisionType = 'percentage' | 'amount' | 'shares'

export enum DivisionTranslationEnum {
  percentage = 'Procenty',
  amount = 'Kwota',
  shares = 'Udziały',
}

export enum DivisionUnitEnum {
  percentage = '%',
  amount = 'zł',
  shares = '',
}

export interface Division {
  [index: string]: number | null
}

export type SimpleProduct = Omit<Product, '_id'>

export interface Product {
  _id: ProductId
  division: Division
  divisionType: DivisionType
  name: string
  price: number
  count: number
  discount: number
  totalPrice: number
}

export interface SimpleReceipt {
  sum: number
  title: string
  products: Product[]
}

export interface Receipt extends SimpleReceipt {
  _id: ReceiptId
  owner: UserId
  contributors: Record<string, number>
  imagePath: string
  createdAt: string
  updatedAt: string
}

export type ImageBase64 = string

export default {}
