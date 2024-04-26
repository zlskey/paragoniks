import { Container, Stack, Toolbar } from '@mui/material'

import Header from '../header'
import MobileNavigation from '../mobile-navigation/mobile-navigation'
import { WrapperProps } from './wrapper.types'
import useScreenSize from 'src/helpers/hooks/use-screen-size'

const Wrapper = ({ children }: WrapperProps) => {
  const { isDesktop } = useScreenSize()

  return (
    <Stack>
      {isDesktop && (
        <>
          <Header />
          <Toolbar />
        </>
      )}

      <Container sx={{ mt: 2, mb: isDesktop ? 3 : 10 }} component='main'>
        {children}
      </Container>

      {!isDesktop && <MobileNavigation />}
    </Stack>
  )
}

export default Wrapper
