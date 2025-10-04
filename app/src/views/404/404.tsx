import Button from '@components/button'
import Flex from '@components/flex'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'
import { FontAwesome5 } from '@expo/vector-icons'
import { useUserContext } from '@helpers/contexts/user.context'
import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'

function NotFoundScreen() {
  const router = useRouter()
  const { colors } = useTheme()
  const { loggedIn } = useUserContext()

  function handleGoHome() {
    router.push(loggedIn ? '/home' : '/a')
  }

  function handleGoBack() {
    router.back()
  }

  return (
    <Wrapper>
      <Flex
        direction="column"
        justifyContent="center"
        alignContent="center"
        nativeFlex
        spacing={3}
        styles={{ flex: 1, paddingHorizontal: 24 }}
      >
        <Flex direction="column" alignContent="center" spacing={2}>
          <FontAwesome5
            name="exclamation-triangle"
            size={80}
            color={colors.primary}
          />
          <Typography
            variant="display"
            styles={{
              textAlign: 'center',
              fontSize: 72,
              fontWeight: 'bold',
              color: colors.primary,
            }}
          >
            404
          </Typography>
        </Flex>

        <Flex direction="column" alignContent="center" spacing={1}>
          <Typography
            variant="title"
            styles={{
              textAlign: 'center',
              color: colors.onBackground,
            }}
          >
            Strona nie została znaleziona
          </Typography>
          <Typography
            variant="subtitle2"
            styles={{
              textAlign: 'center',
              color: colors.onSurfaceVariant,
              lineHeight: 24,
            }}
          >
            Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona.
          </Typography>
        </Flex>

        <Flex
          direction="column"
          alignContent="stretch"
          spacing={2}
          styles={{ width: '100%', maxWidth: 300 }}
        >
          <Button
            onPress={handleGoHome}
            variant="contained"
            startIcon={(
              <FontAwesome5
                name="home"
                size={16}
                color={colors.onPrimary}
              />
            )}
          >
            Wróć do strony głównej
          </Button>

          <Button
            onPress={handleGoBack}
            variant="outlined"
            startIcon={(
              <FontAwesome5
                name="arrow-left"
                size={16}
                color={colors.primary}
              />
            )}
          >
            Wróć do poprzedniej strony
          </Button>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default NotFoundScreen
