import Flex from '@components/flex'
import { useGoogleAuth } from '@hooks/use-google-auth'
import { Button } from 'react-native-paper'

function SocialButtons() {
  const { onGooglePress, isGooglePending } = useGoogleAuth()

  return (
    <Flex direction="column" spacing={2} alignContent="stretch">
      <Button
        loading={isGooglePending}
        onPress={onGooglePress}
        mode="contained"
        icon="google"
        buttonColor="white"
        textColor="rgba(0, 0, 0, 0.54)"
        style={{ borderWidth: 1, borderColor: '#E0E0E0' }}
      >
        Zaloguj się przez Google
      </Button>
    </Flex>
  )
}

export default SocialButtons
