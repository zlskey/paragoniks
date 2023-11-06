import mongoose from 'mongoose'

export interface IProduct {
  comprising: string[]
  name: string
  price: number
  count: number
  _id: string
}

export interface ISimpleReceipt {
  sum: number
  title: string
  products: IProduct[]
  imagePath: string
}

export interface IReceipt extends ISimpleReceipt {
  _id: string
  owner: string
  contributors: string[]
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
  contributors: [],
  products: [],
})

receiptSchema.pre('save', async function (next) {
  this.products = this.products.map(product => ({
    ...product,
    _id: new mongoose.Types.ObjectId().toString(),
    comprising: [],
  }))

  next()
})

const Receipt = mongoose.model<IReceipt>('Receipts', receiptSchema)

export default Receipt
