import { GetProfilesBody } from 'src/helpers/services/endpoints/profiles/profiles.service.types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { profilesService } from 'src/helpers/services'
import { wrapThunk } from 'src/helpers/utils/wrap-thunk'

export const getProfiles = createAsyncThunk(
  'profiles/getProfiles',
  async (body: GetProfilesBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return profilesService.getProfiles(body)
    })
)
