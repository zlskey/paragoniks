import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import { Friendship, RsApiError } from 'src/types/generic.types'
import {
  getAllFriendships,
  removeFriend,
  respondToFriendRequest,
  sendFriendRequest,
} from './friends.thunk'

import { RootState } from 'src/redux-store'

interface FriendsState {
  items: Friendship[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: RsApiError['message'] | null
}

const initialState: FriendsState = {
  items: [],
  loading: 'idle',
  error: null,
}

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
      state.loading = 'idle'
    },
  },
  extraReducers: builder => {
    addBuilderCase(builder, respondToFriendRequest)
    addBuilderCase(builder, getAllFriendships)
    addBuilderCase(builder, sendFriendRequest)
    addBuilderCase(builder, removeFriend)
  },
})

const addBuilderCase = (
  builder: ActionReducerMapBuilder<FriendsState>,
  asyncThunk: AsyncThunk<any, any, any>
) => {
  return builder
    .addCase(asyncThunk.pending, state => {
      state.loading = 'pending'
      state.error = null
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.items = action.payload
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.payload as string
    })
}

export const selectAllFriendships = (state: RootState): Friendship[] =>
  state.friends.items

export const selectFriendship = (friendshipId?: string) => (state: RootState) =>
  state.friends.items.find(friendships => friendships._id === friendshipId)

export const selectFriendshipsLoading = (state: RootState) =>
  state.friends.loading

export const selectFriendshipsError = (state: RootState) => state.friends.error

export const { clearError: clearFriendshipsError } = friendsSlice.actions

export default friendsSlice.reducer
