// Shared types for both frontend and backend
// Using string types for IDs to maintain compatibility across environments

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

// ID types - using strings for cross-environment compatibility
export type UserId = string
export type ProductId = string
export type ReceiptId = string
export type FriendId = string
export type FriendshipId = string

export interface UserMeta {
  media_quality_warning_accepted?: boolean
  noOfScans?: number
  noOfReceipts?: number
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

export type DivisionType = keyof typeof DivisionTranslationEnum

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

export interface SimpleProduct {
  name: string
  price: number
  count: number
  discount: number
}

export interface Product extends SimpleProduct {
  _id: ProductId
  division: Division
  divisionType: DivisionType
  totalPrice: number
}

export function isProduct(obj: any): obj is Product {
  return (
    typeof obj === 'object'
    && obj !== null
    && typeof obj._id === 'string'
    && typeof obj.totalPrice === 'number'
    && 'division' in obj
    && 'divisionType' in obj
  )
}

export interface SimpleReceipt {
  sum: number
  title: string
  products: SimpleProduct[]
}

export enum ScanningStatus {
  FAILED = 'failed',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export interface Receipt extends SimpleReceipt {
  _id: ReceiptId
  owner: UserId
  contributors: Record<string, number>
  products: Product[]
  imagePath: string
  createdAt: string
  updatedAt: string
  scanning?: {
    status: ScanningStatus
    errorMessage?: string
  }
}

export type ImageBase64 = string

// Export individual type files for better organization
export * from './user.types'
export * from './receipt.types'
export * from './product.types'
export * from './division.types'

export default {}
