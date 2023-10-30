import mongoose from 'mongoose'

export interface IItem {
  comprising: string[]
  name: string
  value: number
  count: number
  _id: string
}

export interface ISimpleReceipt {
  sum: number
  title: string
  items: IItem[]
  imagePath: string
}

export interface IReceipt extends ISimpleReceipt {
  _id: string
  owner: string
  others: string[]
}

const receiptSchema = new mongoose.Schema<IReceipt>({
  title: {
    type: String,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  others: [],
  items: [],
})

receiptSchema.pre('save', async function (next) {
  this.items = this.items.map(item => ({
    ...item,
    _id: new mongoose.Types.ObjectId().toString(),
    comprising: [],
  }))

  next()
})

const Receipt = mongoose.model<IReceipt>('Receipts', receiptSchema)

export default Receipt
