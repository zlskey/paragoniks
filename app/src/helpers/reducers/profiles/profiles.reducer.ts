import { Profile, RsApiError, UserId } from 'src/types/generic.types'

import { RootState } from 'src/redux-store'
import { createSlice } from '@reduxjs/toolkit'
import { getProfiles } from './profiles.thunk'

interface ProfilesState {
  items: Profile[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: RsApiError['message'] | null
}

const initialState: ProfilesState = {
  items: [],
  loading: 'idle',
  error: null,
}

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
      state.loading = 'idle'
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProfiles.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(getProfiles.fulfilled, (state, action) => {
        state.loading = 'succeeded'

        const payload = action.payload as Profile[]

        state.items = Object.values(
          payload.concat(state.items).reduce((acc, cur) => {
            acc[cur._id] = cur
            return acc
          }, {} as Record<UserId, Profile>)
        )
      })
      .addCase(getProfiles.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
  },
})

export const selectAllProfiles = (state: RootState): Profile[] =>
  state.profiles.items

export const selectSingleProfile = (userId?: UserId) => (state: RootState) =>
  state.profiles.items.find(profile => profile._id === userId)

export const selectProfilesLoading = (state: RootState) =>
  state.profiles.loading

export const selectProfilesError = (state: RootState) => state.profiles.error

export const { clearError: clearProfilesError } = profilesSlice.actions

export default profilesSlice.reducer
