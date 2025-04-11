import type { ProductId, ReceiptId, UserId } from 'src/types/generic.types'

import mongoose from 'mongoose'

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
  imagePath: string
  contributors: string[]
  products: ISimpleProduct[]
}

export interface IReceipt extends Omit<ISimpleReceipt, 'contributors'> {
  _id: ReceiptId
  owner: UserId
  products: IProduct[]
  createdAt: string
  updatedAt: string
  contributors: Record<string, number>
}

const receiptSchema = new mongoose.Schema<IReceipt>(
  {
    title: {
      type: String,
      required: true,
    },
    sum: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    imagePath: {
      type: String,
      default: '',
    },
    contributors: {},
    products: [],
  },
  {
    timestamps: true,
  },
)

receiptSchema.pre('save', async function (next) {
  this.products = this.products.map(product => ({
    ...product,
    _id: new mongoose.Types.ObjectId(),
  }))

  next()
})

const Receipt = mongoose.model<IReceipt>('Receipts', receiptSchema)

export default Receipt
