export interface UserLoginBody {
  username: string
  password: string
}

export interface UserSignupBody extends UserLoginBody {}

export interface RespondToFriendRequestBody {
  username: string
  accept: boolean
}
