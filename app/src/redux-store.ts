import { configureStore } from '@reduxjs/toolkit'
import receiptReducer from 'src/helpers/reducers/receipt/receipt.reducer'
import userReducer from 'src/helpers/reducers/user/user.reducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    receipt: receiptReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
