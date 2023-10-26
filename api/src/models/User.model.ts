import { ErrorObject } from 'src/middlewares/error.middleware'
import _ from 'lodash'
import bcrypt from 'bcrypt'
import constants from 'src/constants'
import mongoose from 'mongoose'
import { userService } from 'src/services'

export interface IUser {
  _id: mongoose.Types.ObjectId

  username: string
  password: string

  friends: string[]

  removePassword(): Omit<IUser, 'password'>
  validatePassword(this: IUser, password: string): Promise<void>
  changePassword(this: IUser, password: string): Promise<void>
  startEncryption(this: IUser, passphrase: string): Promise<void>
  changePassphrase(
    this: IUser,
    current: string,
    newPassphrase: string
  ): Promise<void>
  changeUsername(this: IUser, username: string): Promise<IUser>
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  friends: [],
})

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

class UserClass {
  async validatePassword(this: IUser, password: string): Promise<void> {
    console.log(password, this.password)
    const isValid = await bcrypt.compare(password, this.password)

    if (isValid) return

    throw new ErrorObject(constants.invalid_password, 401)
  }

  async changePassword(
    this: IUser,
    password: IUser['password']
  ): Promise<void> {
    const salt = await bcrypt.genSalt()
    const newPassword = (password = await bcrypt.hash(password, salt))

    await User.findByIdAndUpdate(this._id, { password: newPassword })
  }

  async changeUsername(this: IUser, username: string): Promise<IUser> {
    if (this.username === username) {
      throw new ErrorObject(constants.username_duplicate) // @todo
    }

    const isOccupied = await User.findOne({ username })

    if (isOccupied) {
      throw new ErrorObject(constants.username_duplicate)
    }

    return userService.update(this._id, { username })
  }

  removePassword(this: IUser): Omit<IUser, 'password'> {
    return _.omit(this, 'password')
  }
}

userSchema.loadClass(UserClass)

const User = mongoose.model<IUser>('Users', userSchema)

export default User
