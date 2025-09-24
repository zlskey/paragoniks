import type { UserId } from 'src/types'
import mongoose from 'mongoose'
import config from 'src/config'

export interface IPasswordRecoveryModel {
  _id: mongoose.Types.ObjectId
  accountId: UserId
  code: string
  createdAt: Date
  updatedAt: Date
  getExpirationDate: () => Date
  isExpired: () => boolean
}

const passwordRecoverySchema = new mongoose.Schema<IPasswordRecoveryModel>({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
    index: true,
  },
  code: {
    type: String,
    required: true,
    index: true,
  },
}, {
  timestamps: true,
})

// Create compound index for efficient lookups
passwordRecoverySchema.index({ accountId: 1, code: 1 })

// TTL index to automatically delete expired records after 24 hours
passwordRecoverySchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 })

class PasswordRecoveryClass {
  getExpirationDate(this: IPasswordRecoveryModel) {
    const createdAt = new Date(this.createdAt)
    const expirationDate = new Date(createdAt.getTime() + config.PASSWORD_RECOVERY_EXPIRATION_TIME)
    return expirationDate
  }

  isExpired(this: IPasswordRecoveryModel) {
    const now = new Date()
    const expirationDate = this.getExpirationDate()
    return now > expirationDate
  }
}

passwordRecoverySchema.loadClass(PasswordRecoveryClass)

const PasswordRecoveryModel = mongoose.model<IPasswordRecoveryModel>('PasswordRecovery', passwordRecoverySchema)

export default PasswordRecoveryModel
