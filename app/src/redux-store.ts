import { configureStore } from '@reduxjs/toolkit'
import friendsReducer from './helpers/reducers/friends/friends.reducer'
import receiptReducer from 'src/helpers/reducers/receipt/receipt.reducer'
import userReducer from 'src/helpers/reducers/user/user.reducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    receipt: receiptReducer,
    friends: friendsReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
