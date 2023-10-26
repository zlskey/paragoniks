import { configureStore } from '@reduxjs/toolkit'
import userReducer from './helpers/reducers/user/user.reducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
