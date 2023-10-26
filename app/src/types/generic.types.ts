export interface RsApiError {
  message: string
  code: number
}

export interface User {
  username: string
  friends: string[]
}

export interface Friend {
  username: string
}
