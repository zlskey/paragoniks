import { colors } from '@app/styles'
import Flex from '@components/flex'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Linking, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

function Auth() {
  function onSignInPress() {
    router.push('/a/login')
  }

  function onSignUpPress() {
    router.push('/a/signup')
  }

  function onTermsPress() {
    Linking.openURL('https://www.google.com')
  }

  function onPrivacyPolicyPress() {
    Linking.openURL('https://www.google.com')
  }

  function onCookiePolicyPress() {
    Linking.openURL('https://www.google.com')
  }

  function onApplePress() {
    Linking.openURL('https://www.google.com')
  }

  function onGooglePress() {
    Linking.openURL('https://www.google.com')
  }

  return (
    <Wrapper>
      <Flex
        direction="column"
        justifyContent="space-between"
        alignContent="stretch"
        nativeFlex
        spacing={1}
      >
        <Image
          source={require('@assets/images/adaptive-icon.png')}
          style={{ width: 80, height: 80, alignSelf: 'center' }}
        />

        <Typography
          variant="display"
          styles={{ textAlign: 'center' }}
        >
          Zarządzaj wydatkami razem z przyjaciółmi łatwo i wygodnie.
        </Typography>

        <Flex
          pr={2}
          pl={2}
          spacing={2}
          direction="column"
          alignContent="stretch"
          justifyContent="center"
        >
          <Button
            disabled
            mode="contained"
            onPress={onGooglePress}
            icon="google"
            style={styles.button}
          >
            Zaloguj się przez Google
          </Button>

          <Button
            disabled
            mode="contained"
            onPress={onApplePress}
            icon="apple"
            style={styles.button}
          >
            Zaloguj się przez Apple
          </Button>

          <Flex
            pr={2}
            pl={2}
            spacing={1}
            alignContent="center"
            justifyContent="center"
          >
            <Flex
              nativeFlex
              styles={{ height: 1, backgroundColor: colors.placeholder }}
            />
            <Typography styles={{ color: colors.placeholder }}>lub</Typography>
            <Flex
              nativeFlex
              styles={{ height: 1, backgroundColor: colors.placeholder }}
            />
          </Flex>

          <Button
            mode="contained"
            onPress={onSignUpPress}
            style={styles.button}
          >
            Utwórz konto
          </Button>

          <Flex direction="column" spacing={2}>
            <Typography styles={{ color: colors.placeholder }}>
              Rejestrując się, akceptujesz nasze
              {' '}
              <Typography
                styles={styles.link}
                onPress={onTermsPress}
              >
                Warunki
              </Typography>
              ,
              {' '}
              <Typography
                styles={styles.link}
                onPress={onPrivacyPolicyPress}
              >
                Politykę prywatności
              </Typography>
              {' '}
              oraz
              {' '}
              <Typography
                styles={styles.link}
                onPress={onCookiePolicyPress}
              >
                zasady dotyczące plików cookie
              </Typography>
              .
            </Typography>

            <Flex>
              <Typography styles={{ color: colors.placeholder }}>Masz już konto?</Typography>
              <Typography>{' '}</Typography>
              <Typography onPress={onSignInPress} styles={styles.link}>Zaloguj się</Typography>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  link: {
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.text,
    color: colors.background,
  },
})

export default Auth
