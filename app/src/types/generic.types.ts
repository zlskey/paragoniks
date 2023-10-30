export interface RsApiError {
  message: string
  code: number
}

export interface User {
  username: string
  friends: Friend[]
}

export interface Friend {
  username: string
  status: 'accepted' | 'pending'
  image?: string
}

export interface Item {
  comprising: string[]
  name: string
  value: number
  count: number
  _id: string
}

export interface SimpleReceipt {
  sum: number
  title: string
  items: Item[]
}

export interface Receipt extends SimpleReceipt {
  _id: string
  owner: string
  others: string[]
  imagePath: string
}
