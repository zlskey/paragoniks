import type { ProductId, ReceiptId, UserId } from 'src/types/backend.types'

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
  imagePath: string | null
  contributors: Record<string, number>
  products: ISimpleProduct[]
}

export enum ScanningStatus {
  FAILED = 'failed',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export interface IReceipt extends ISimpleReceipt {
  _id: ReceiptId
  owner: UserId
  products: IProduct[]
  isRemoved: boolean
  scanning: {
    status: ScanningStatus
    errorMessage?: string
  }
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
      default: null,
    },
    scanning: {
      status: {
        type: String,
        enum: ScanningStatus,
        default: ScanningStatus.IN_PROGRESS,
      },
      errorMessage: {
        type: String,
        default: null,
      },
    },
    isRemoved: {
      type: Boolean,
      default: false,
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
