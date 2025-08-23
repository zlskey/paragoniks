import type { UserId } from 'src/types/backend.types'
import mongoose from 'mongoose'
import config from 'src/config'

export interface IScanCount {
  _id: mongoose.Types.ObjectId
  count: number
  userId: UserId
  createdAt: string
  updatedAt: string
  getExpirationDate: () => Date
  incrementCount: () => Promise<IScanCount>
  isExpired: () => boolean
}

const scanCountSchema = new mongoose.Schema<IScanCount>(
  {
    count: {
      type: Number,
      required: true,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
)

class ScanCountClass {
  getExpirationDate(this: IScanCount) {
    const createdAt = new Date(this.createdAt)
    const expirationDate = new Date(createdAt.getTime() + config.SCAN_COUNT_EXPIRATION_TIME)
    return expirationDate
  }

  isExpired(this: IScanCount) {
    const now = new Date()
    const expirationDate = this.getExpirationDate()
    return now > expirationDate
  }

  async incrementCount(this: mongoose.Document & IScanCount) {
    this.count++
    await this.save()
    return this
  }
}

scanCountSchema.loadClass(ScanCountClass)

const ScanCount = mongoose.model<IScanCount>('ScanCounts', scanCountSchema)

export default ScanCount
