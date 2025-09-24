import type { UserId } from 'src/types'
import mongoose from 'mongoose'
import config from 'src/config'

export interface IMailConfirmationModel {
  _id: mongoose.Types.ObjectId
  accountId: UserId
  hash: string
  createdAt: Date
  updatedAt: Date
  getExpirationDate: () => Date
  isExpired: () => boolean
}

const mailConfirmationSchema = new mongoose.Schema<IMailConfirmationModel>({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
    index: true,
  },
  hash: {
    type: String,
    required: true,
    index: true,
  },
}, {
  timestamps: true,
})

// Create compound index for efficient lookups
mailConfirmationSchema.index({ accountId: 1, hash: 1 })

// TTL index to automatically delete expired records after 7 days
mailConfirmationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 })

class MailConfirmationClass {
  getExpirationDate(this: IMailConfirmationModel) {
    const createdAt = new Date(this.createdAt)
    const expirationDate = new Date(createdAt.getTime() + config.MAIL_CONFIRMATION_EXPIRATION_TIME)
    return expirationDate
  }

  isExpired(this: IMailConfirmationModel) {
    const now = new Date()
    const expirationDate = this.getExpirationDate()
    return now > expirationDate
  }
}

mailConfirmationSchema.loadClass(MailConfirmationClass)

const MailConfirmationModel = mongoose.model<IMailConfirmationModel>('MailConfirmation', mailConfirmationSchema)

export default MailConfirmationModel
