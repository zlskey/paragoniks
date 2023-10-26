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
