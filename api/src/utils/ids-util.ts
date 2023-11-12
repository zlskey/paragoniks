import mongoose, { Types } from 'mongoose'

type Id = string | Types.ObjectId

export const compareIds = (a: Id, b: Id) => {
  const firstId = new mongoose.Types.ObjectId(a as string)
  const secondId = new mongoose.Types.ObjectId(b as string)

  return firstId.equals(secondId)
}
