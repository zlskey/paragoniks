import { AvatarColor, IUser } from './user.model'

import { ErrorObject } from 'src/middlewares/error.middleware'
import { UserId } from 'src/types/generic.types'
import { anonimUsersService } from 'src/services'
import constants from 'src/constants'
import mongoose from 'mongoose'

export interface IAnonim
  extends Pick<IUser, '_id' | 'username' | 'avatarImage' | 'avatarColor'> {
  ownerId: UserId

  changeUsername(this: IAnonim, username: string): Promise<IAnonim>
  changeAvatarImage(this: IAnonim, image: string): Promise<IAnonim>
  changeAvatarColor(this: IAnonim, color: AvatarColor): Promise<IAnonim>
}

const anonimSchema = new mongoose.Schema<IAnonim>({
  username: {
    type: String,
    required: true,
  },
  avatarImage: {
    type: String,
    default: '',
  },
  avatarColor: {
    type: String,
    default: 'default',
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
})

class AnonimClass {
  async changeUsername(this: IAnonim, username: string): Promise<IAnonim> {
    if (this.username === username) {
      throw new ErrorObject(constants.username_duplicate) // @todo???
    }

    const isOccupied = await Anonim.findOne({ username, ownerId: this.ownerId })

    if (isOccupied) {
      throw new ErrorObject(constants.username_duplicate)
    }

    return anonimUsersService.update(this.ownerId, this.username, { username })
  }

  // todo
  changeAvatarColor(this: IAnonim, color: AvatarColor): Promise<IAnonim> {
    return anonimUsersService.update(this.ownerId, this.username, {
      avatarColor: color,
    })
  }

  // todo
  changeAvatarImage(this: IAnonim, image: string): Promise<IAnonim> {
    return anonimUsersService.update(this.ownerId, this.username, {
      avatarImage: image,
    })
  }
}

anonimSchema.loadClass(AnonimClass)

const Anonim = mongoose.model<IAnonim>('Anonims', anonimSchema)

export default Anonim
