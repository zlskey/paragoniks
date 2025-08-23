import type mongoose from 'mongoose'

// Backend-specific ID types using MongoDB ObjectId
export type UserId = mongoose.Types.ObjectId
export type ProductId = mongoose.Types.ObjectId
export type ReceiptId = mongoose.Types.ObjectId
export type FriendId = mongoose.Types.ObjectId
export type FriendshipId = mongoose.Types.ObjectId

// Backend-specific interfaces that override shared types with ObjectId
export interface User {
  _id: UserId
  username: string
  avatarColor: string
  avatarImage: string
  meta?: {
    media_quality_warning_accepted?: boolean
    noOfScans?: number
    noOfReceipts?: number
  }
}

export interface Profile extends User {
  ownerId?: UserId
}

export interface Anonim extends User {
  ownerId: UserId
}

export interface Friendship {
  _id: FriendshipId
  friendId: UserId
  status: 'accepted' | 'pending'
}

export interface Product {
  _id: ProductId
  name: string
  price: number
  count: number
  discount: number
  division: Record<string, number | null>
  divisionType: string
  totalPrice: number
}

export interface Receipt {
  _id: ReceiptId
  sum: number
  title: string
  owner: UserId
  contributors: Record<string, number>
  products: Product[]
  imagePath: string
  createdAt: string
  updatedAt: string
  scanning?: {
    status: 'failed' | 'in_progress' | 'done'
    errorMessage?: string
  }
}

// Define shared types locally to avoid import issues
export interface UserMeta {
  media_quality_warning_accepted?: boolean
  noOfScans?: number
  noOfReceipts?: number
}

export interface SimpleProduct {
  name: string
  price: number
  count: number
  discount: number
}

export interface SimpleReceipt {
  sum: number
  title: string
  products: SimpleProduct[]
}

export interface Division {
  [index: string]: number | null
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

export enum ScanningStatus {
  FAILED = 'failed',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export type ImageBase64 = string

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

// Define the isProduct function locally
export function isProduct(obj: any): obj is Product {
  return (
    typeof obj === 'object'
    && obj !== null
    && typeof obj._id === 'object' // ObjectId in backend
    && typeof obj.totalPrice === 'number'
    && 'division' in obj
    && 'divisionType' in obj
  )
}
