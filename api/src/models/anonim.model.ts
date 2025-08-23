import type { Anonim, AvatarColor } from 'src/types'

import mongoose from 'mongoose'
import constants from 'src/constants'
import { ErrorObject } from 'src/middlewares/error.middleware'
import { anonimUsersService } from 'src/services'

export interface IAnonimModel extends Anonim {
  changeUsername: (this: IAnonimModel, username: string) => Promise<IAnonimModel>
  changeAvatarImage: (this: IAnonimModel, image: string) => Promise<IAnonimModel>
  changeAvatarColor: (this: IAnonimModel, color: AvatarColor) => Promise<IAnonimModel>
}

const anonimSchema = new mongoose.Schema<IAnonimModel>({
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
  async changeUsername(this: IAnonimModel, username: string): Promise<IAnonimModel> {
    if (this.username === username) {
      throw new ErrorObject(constants.username_duplicate) // @todo???
    }

    const isOccupied = await AnonimModel.findOne({ username, ownerId: this.ownerId })

    if (isOccupied) {
      throw new ErrorObject(constants.username_duplicate)
    }

    return anonimUsersService.update(this.ownerId, this.username, { username })
  }

  // todo
  changeAvatarColor(this: IAnonimModel, color: AvatarColor): Promise<IAnonimModel> {
    return anonimUsersService.update(this.ownerId, this.username, {
      avatarColor: color,
    })
  }

  // todo
  changeAvatarImage(this: IAnonimModel, image: string): Promise<IAnonimModel> {
    return anonimUsersService.update(this.ownerId, this.username, {
      avatarImage: image,
    })
  }
}

anonimSchema.loadClass(AnonimClass)

const AnonimModel = mongoose.model<IAnonimModel>('Anonims', anonimSchema)

export default AnonimModel
