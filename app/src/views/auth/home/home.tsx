import Flex from '@components/flex'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'
import { Button } from 'react-native-paper'
import { AppLogo, AuthLink, Divider, LegalLinks, SocialButtons } from '../components'
import { useAuthNavigation } from '../hooks'
import { AUTH_LABELS, AUTH_TITLES } from '../utils'

function Home() {
  const { navigateToLogin, navigateToSignup } = useAuthNavigation()

  return (
    <Wrapper>
      <Flex
        direction="column"
        justifyContent="space-between"
        alignContent="stretch"
        nativeFlex
        spacing={1}
      >
        <AppLogo />

        <Typography
          variant="display"
          styles={{ textAlign: 'center' }}
        >
          {AUTH_TITLES.MAIN}
        </Typography>

        <Flex
          pr={2}
          pl={2}
          spacing={2}
          direction="column"
          alignContent="stretch"
          justifyContent="center"
        >
          <SocialButtons />

          <Divider />

          <Button
            mode="contained"
            onPress={navigateToSignup}
          >
            {AUTH_LABELS.CREATE_ACCOUNT}
          </Button>

          <Flex direction="column" spacing={2}>
            <LegalLinks />

            <AuthLink
              text="Masz już konto?"
              linkText="Zaloguj się"
              onPress={navigateToLogin}
            />
          </Flex>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default Home
