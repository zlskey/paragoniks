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
