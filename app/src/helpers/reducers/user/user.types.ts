export interface UserLoginBody {
  username: string
  password: string
}

export interface UserSignupBody extends UserLoginBody {
  repeatPassword: string
}

export interface RespondToFriendRequestBody {
  username: string
  accept: boolean
}
