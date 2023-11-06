import { isAxiosError } from 'axios'
import isRsApiError from 'src/types/type-guards/is-rs-api-error'

const wrapThunk = async (rejectWithValue: Function, fun: Function) => {
  try {
    return await fun()
  } catch (err: unknown) {
    if (
      isAxiosError(err) &&
      isRsApiError(err.response?.data.error) &&
      err.response?.data.error.message
    ) {
      return rejectWithValue(err.response.data.error.message)
    }

    return rejectWithValue('Unexpected error occured')
  }
}

export { wrapThunk }
