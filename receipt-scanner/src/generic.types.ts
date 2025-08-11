import type { ObjectId } from 'mongodb'

export type UserId = ObjectId

export type ReceiptId = ObjectId

export type ProductId = ObjectId

export type DivisionType = 'percentage' | 'amount' | 'shares'

export interface Division {
  [index: string]: number | null
}

export interface ISimpleProduct {
  name: string
  price: number
  count: number
  discount: number
}
export interface IProduct extends ISimpleProduct {
  _id: ProductId
  division: Division
  divisionType: DivisionType
  totalPrice: number
}

export interface ISimpleReceipt {
  sum: number
  title: string
  imagePath: string | null
  contributors: Record<string, number>
  products: ISimpleProduct[]
}

export interface IReceipt extends ISimpleReceipt {
  _id: ReceiptId
  owner: UserId
  products: IProduct[]
  createdAt: string
  updatedAt: string
  isCreating?: boolean
}
