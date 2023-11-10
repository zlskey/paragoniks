
export interface RsApiError {
  message: string
  code: number
}


export enum AvatarColor {
  Red = '#ff9800',
  Blue = '#f44336',
  Green = '#2196f3',
  Yellow = '#4caf50',
  Pink = '#ffeb3b',
  Purple = '#e91e63',
  Orange = '#9c27b0',
  Default = 'default',
}

export interface User {
  username: string
  friends: Friend[]
  theme: 'light' | 'dark'
  avatarColor: AvatarColor
  avatarImage: string
}

export interface Friend {
  username: string
  status: 'accepted' | 'pending'
  avatarColor: AvatarColor
  avatarImage: string
}

export interface Product {
  comprising: string[]
  name: string
  price: number
  count: number
  _id: string
}

export interface SimpleReceipt {
  sum: number
  title: string
  products: Product[]
}

export interface Receipt extends SimpleReceipt {
  _id: string
  owner: string
  contributors: string[]
  imagePath: string
}
