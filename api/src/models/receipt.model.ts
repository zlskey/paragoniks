import { ProductId, ReceiptId, UserId } from 'src/types/generic.types'

import mongoose from 'mongoose'

export type DivisionType = 'percentage' | 'amount' | 'shares'

export interface Division {
  [index: string]: number | null
}

export interface IProduct {
  division: Division
  divisionType: DivisionType
  name: string
  price: number
  count: number
  discount: number
  _id: ProductId
}

export interface ISimpleReceipt {
  sum: number
  title: string
  products: IProduct[]
  imagePath: string
}

export interface IReceipt extends ISimpleReceipt {
  _id: ReceiptId
  owner: UserId
  contributors: UserId[]
  createdAt: string
  updatedAt: string
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
      required: true,
    },
    contributors: [],
    products: [],
  },
  {
    timestamps: true,
  }
)

receiptSchema.pre('save', async function (next) {
  this.products = this.products.map(product => ({
    ...product,
    _id: new mongoose.Types.ObjectId(),
    comprising: [],
  }))

  next()
})

const Receipt = mongoose.model<IReceipt>('Receipts', receiptSchema)

export default Receipt
