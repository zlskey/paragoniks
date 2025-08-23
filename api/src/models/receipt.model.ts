import type { Receipt } from 'src/types'

import mongoose from 'mongoose'
import { ScanningStatus } from 'src/types'

export interface IReceiptModel extends Receipt {}

const receiptSchema = new mongoose.Schema<IReceiptModel>(
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

const ReceiptModel = mongoose.model<IReceiptModel>('Receipts', receiptSchema)

export default ReceiptModel
