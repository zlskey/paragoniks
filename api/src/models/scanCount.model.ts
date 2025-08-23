import type { ScanCount } from 'src/types'
import mongoose from 'mongoose'
import config from 'src/config'

export interface IScanCountModel extends ScanCount {
  getExpirationDate: () => Date
  incrementCount: () => Promise<ScanCount>
  isExpired: () => boolean
}

const scanCountSchema = new mongoose.Schema<IScanCountModel>(
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
  getExpirationDate(this: IScanCountModel) {
    const createdAt = new Date(this.createdAt)
    const expirationDate = new Date(createdAt.getTime() + config.SCAN_COUNT_EXPIRATION_TIME)
    return expirationDate
  }

  isExpired(this: IScanCountModel) {
    const now = new Date()
    const expirationDate = this.getExpirationDate()
    return now > expirationDate
  }

  async incrementCount(this: mongoose.Document & IScanCountModel) {
    this.count++
    await this.save()
    return this
  }
}

scanCountSchema.loadClass(ScanCountClass)

const ScanCountModel = mongoose.model<IScanCountModel>('ScanCounts', scanCountSchema)

export default ScanCountModel
