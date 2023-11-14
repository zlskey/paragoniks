import { configureStore } from '@reduxjs/toolkit'
import friendsReducer from './helpers/reducers/friends/friends.reducer'
import profilesReducer from './helpers/reducers/profiles/profiles.reducer'
import receiptReducer from 'src/helpers/reducers/receipt/receipt.reducer'
import userReducer from 'src/helpers/reducers/user/user.reducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    receipt: receiptReducer,
    friends: friendsReducer,
    profiles: profilesReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
