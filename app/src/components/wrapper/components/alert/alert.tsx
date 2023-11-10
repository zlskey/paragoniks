import {
  clearReceiptError,
  selectReceiptError,
} from 'src/helpers/reducers/receipt/receipt.reducer'

import { StyledAlert } from './alert.styles'
import { clearUserError } from 'src/helpers/reducers/user/user.reducer'
import { createPortal } from 'react-dom'
import { selectUserError } from 'src/helpers/reducers/user/user.reducer'
import { useAppSelector } from 'src/redux-hooks'
import { useDispatch } from 'react-redux'

const Alert = () => {
  const userError = useAppSelector(selectUserError)
  const receiptError = useAppSelector(selectReceiptError)

  const dispatch = useDispatch()

  const clearError = () => {
    userError ? dispatch(clearUserError()) : dispatch(clearReceiptError())
  }

  if (!userError && !receiptError) {
    return null
  }

  return createPortal(
    <StyledAlert onClose={clearError} severity='error'>
      {userError || receiptError}
    </StyledAlert>,
    document.getElementById('root') as HTMLElement
  )
}

export default Alert
