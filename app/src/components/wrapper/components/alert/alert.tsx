import { StyledAlert } from './alert.styles'
import { clearError } from 'src/helpers/reducers/receipt/receipt.reducer'
import { selectUserError } from 'src/helpers/reducers/user/user.reducer'
import { useAppSelector } from 'src/redux-hooks'
import { useDispatch } from 'react-redux'

const Alert = () => {
  const userError = useAppSelector(selectUserError)

  const dispatch = useDispatch()

  const clearUserError = () => dispatch(clearError())

  if (!userError) {
    return null
  }

  return (
    <StyledAlert onClose={clearUserError} severity='error'>
      {userError}
    </StyledAlert>
  )
}

export default Alert
