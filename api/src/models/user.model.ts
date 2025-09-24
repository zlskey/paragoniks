import type { AvatarColor, Profile, User, UserMeta } from 'src/types'
import { compare, genSalt, hash } from 'bcryptjs'
import _ from 'lodash'
import mongoose from 'mongoose'
import constants from 'src/constants'
import { ErrorObject } from 'src/middlewares/error.middleware'
import { userService } from 'src/services'
import { Lang } from 'src/types'

export interface IUserModel extends User {
  removePassword: () => Omit<IUserModel, 'password'>
  validatePassword: (this: IUserModel, password: string) => Promise<void>
  changePassword: (this: IUserModel, password: string) => Promise<void>
  changeUsername: (this: IUserModel, username: string) => Promise<IUserModel>
  toggleTheme: (this: IUserModel) => Promise<IUserModel>
  changeAvatarColor: (this: IUserModel, color: AvatarColor) => Promise<IUserModel>
  changeAvatarImage: (this: IUserModel, image: string) => Promise<IUserModel>
  pickProfile: (this: IUserModel) => Profile
  setLang: (this: IUserModel, lang: string) => Promise<IUserModel>
  updateMeta: (this: IUserModel, meta: UserMeta) => Promise<IUserModel>
  incrementScanCount: (this: IUserModel) => Promise<IUserModel>
  incrementReceiptCount: (this: IUserModel) => Promise<IUserModel>
}

const userSchema = new mongoose.Schema<IUserModel>({
  username: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
    sparse: true,
  },
  googleId: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
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
  lang: {
    type: String,
    default: Lang.AUTO,
  },
  meta: {
    media_quality_warning_accepted: {
      type: Boolean,
      default: false,
    },
    noOfScans: {
      type: Number,
      default: 0,
    },
    noOfReceipts: {
      type: Number,
      default: 0,
    },
    emailToConfirm: {
      type: String,
      default: null,
    },
  },
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const salt = await genSalt()
    this.password = await hash(this.password, salt)
  }
  next()
})

class UserClass {
  async validatePassword(this: IUserModel, password: string): Promise<void> {
    const isValid = await compare(password, this.password)

    if (isValid) {
      return
    }

    throw new ErrorObject(constants.invalid_password, 401)
  }

  async changePassword(
    this: IUserModel,
    password: IUserModel['password'],
  ): Promise<void> {
    const salt = await genSalt()
    const newPassword = (password = await hash(password, salt))

    console.log('newPassword', newPassword)

    await UserModel.findByIdAndUpdate(this._id, { password: newPassword })
  }

  async changeUsername(this: IUserModel, username: string): Promise<IUserModel> {
    if (this.username === username) {
      throw new ErrorObject(constants.username_duplicate) // @todo
    }

    const isOccupied = await UserModel.findOne({ username })

    if (isOccupied) {
      throw new ErrorObject(constants.username_duplicate)
    }

    return userService.update(this._id, { username })
  }

  removePassword(this: IUserModel): Omit<IUserModel, 'password'> {
    return _.omit(this, 'password')
  }

  toggleTheme(this: IUserModel): Promise<IUserModel> {
    const newTheme = this.theme === 'light' ? 'dark' : 'light'

    return userService.update(this._id, { theme: newTheme })
  }

  changeAvatarColor(this: IUserModel, color: AvatarColor): Promise<IUserModel> {
    return userService.update(this._id, { avatarColor: color })
  }

  changeAvatarImage(this: IUserModel, image: string): Promise<IUserModel> {
    return userService.update(this._id, { avatarImage: image })
  }

  pickProfile(this: IUserModel): Profile {
    return _.pick(this, ['_id', 'username', 'avatarImage', 'avatarColor'])
  }

  setLang(this: IUserModel, lang: Lang): Promise<IUserModel> {
    if (lang in Lang) {
      throw new ErrorObject('Unsupported language')
    }

    return userService.update(this._id, { lang })
  }

  updateMeta(this: IUserModel, meta: UserMeta) {
    const currentMeta = this.meta ?? {}
    return userService.update(this._id, { meta: { ...currentMeta, ...meta } })
  }

  incrementScanCount(this: IUserModel) {
    return userService.update(
      this._id,
      { 'meta.noOfScans': (this.meta.noOfScans ?? 0) + 1 },
    )
  }

  incrementReceiptCount(this: IUserModel) {
    return userService.update(
      this._id,
      { 'meta.noOfReceipts': (this.meta.noOfReceipts ?? 0) + 1 },
    )
  }
}

userSchema.loadClass(UserClass)

const UserModel = mongoose.model<IUserModel>('Users', userSchema)

export default UserModel
