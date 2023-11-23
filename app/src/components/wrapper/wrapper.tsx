import {
  Container,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import Header from '../header'
import MobileNavigation from '../mobile-navigation/mobile-navigation'
import { WrapperProps } from './wrapper.types'

const Wrapper = ({ children }: WrapperProps) => {
  const theme = useTheme()

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Stack>
      {isLargeScreen && (
        <>
          <Header />
          <Toolbar />
        </>
      )}

      <Container sx={{ mt: 2, mb: isLargeScreen ? 3 : 10 }} component='main'>
        {children}
      </Container>

      {!isLargeScreen && <MobileNavigation />}
    </Stack>
  )
}

export default Wrapper
