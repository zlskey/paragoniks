import { ErrorObject } from 'src/middlewares/error.middleware'
import { UserId } from 'src/types/generic.types'
import _ from 'lodash'
import bcrypt from 'bcrypt'
import constants from 'src/constants'
import mongoose from 'mongoose'
import { userService } from 'src/services'

export type AvatarColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'pink'
  | 'purple'
  | 'orange'
  | 'default'

export interface IUser {
  _id: UserId

  username: string
  password: string

  theme: 'light' | 'dark'

  avatarImage: string
  avatarColor: AvatarColor

  removePassword(): Omit<IUser, 'password'>
  validatePassword(this: IUser, password: string): Promise<void>
  changePassword(this: IUser, password: string): Promise<void>
  changeUsername(this: IUser, username: string): Promise<IUser>
  toggleTheme(this: IUser): Promise<IUser>
  changeAvatarColor(this: IUser, color: AvatarColor): Promise<IUser>
  changeAvatarImage(this: IUser, image: string): Promise<IUser>
  pickProfile(
    this: IUser
  ): Pick<IUser, '_id' | 'username' | 'avatarImage' | 'avatarColor'>
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
  theme: {
    type: String,
    default: 'dark',
  },
  avatarImage: {
    type: String,
    default: '',
  },
  avatarColor: {
    type: String,
    default: 'default',
  },
})

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

class UserClass {
  async validatePassword(this: IUser, password: string): Promise<void> {
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

  toggleTheme(this: IUser): Promise<IUser> {
    const newTheme = this.theme === 'light' ? 'dark' : 'light'

    return userService.update(this._id, { theme: newTheme })
  }

  changeAvatarColor(this: IUser, color: AvatarColor): Promise<IUser> {
    return userService.update(this._id, { avatarColor: color })
  }

  changeAvatarImage(this: IUser, image: string): Promise<IUser> {
    return userService.update(this._id, { avatarImage: image })
  }

  pickProfile(
    this: IUser
  ): Pick<IUser, '_id' | 'username' | 'avatarImage' | 'avatarColor'> {
    return _.pick(this, ['_id', 'username', 'avatarImage', 'avatarColor'])
  }
}

userSchema.loadClass(UserClass)

const User = mongoose.model<IUser>('Users', userSchema)

export default User
