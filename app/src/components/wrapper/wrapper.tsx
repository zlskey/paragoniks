import { Container, Stack, Toolbar } from '@mui/material'

import Header from '../header/header'
import { WrapperProps } from './wrapper.types'

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Stack>
      <Header />
      <Toolbar />

      <Container sx={{ mt: 2 }} component='main'>
        {children}
      </Container>
    </Stack>
  )
}

export default Wrapper
