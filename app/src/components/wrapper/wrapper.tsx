import { Alert, Container, Stack, Toolbar, styled } from '@mui/material'
import {
  clearError,
  selectUserError,
} from 'src/helpers/reducers/user/user.reducer'

import Header from '../header/header'
import { PropsWithChildren } from 'react'
import { useAppSelector } from 'src/redux-hooks'
import { useDispatch } from 'react-redux'

interface WrapperProps extends PropsWithChildren {}

const StyledAlert = styled(Alert)({
  position: 'absolute',
  bottom: 10,
  right: 10,
})

const Wrapper = ({ children }: WrapperProps) => {
  const userError = useAppSelector(selectUserError)

  const dispatch = useDispatch()

  const clearUserError = () => dispatch(clearError())

  return (
    <Stack>
      <Header />
      <Toolbar />

      <Container sx={{ mt: 2 }} component='main'>
        {children}
      </Container>

      {userError && (
        <StyledAlert onClose={clearUserError} severity='error'>
          {userError}
        </StyledAlert>
      )}
    </Stack>
  )
}

export default Wrapper
