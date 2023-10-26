import { configureStore } from '@reduxjs/toolkit'
import friendsReducer from './helpers/reducers/friends/friends.reducer'
import userReducer from './helpers/reducers/user/user.reducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    friends: friendsReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
