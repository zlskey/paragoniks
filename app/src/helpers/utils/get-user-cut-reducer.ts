import { Item } from 'src/types/generic.types'

export const getUserCutReducer =
  (username: string) => (acc: number, item: Item) => {
    if (item.comprising.includes(username)) {
      return acc + (item.value * item.count) / item.comprising.length
    }

    return acc
  }
