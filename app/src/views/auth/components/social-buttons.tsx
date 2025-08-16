import Flex from '@components/flex'
import { Linking } from 'react-native'
import { Button } from 'react-native-paper'

interface SocialButtonsProps {
  onGooglePress?: () => void
  onApplePress?: () => void
  disabled?: boolean
}

function SocialButtons({
  onGooglePress = () => Linking.openURL('https://www.google.com'),
  onApplePress = () => Linking.openURL('https://www.google.com'),
  disabled = true,
}: SocialButtonsProps) {
  return (
    <Flex direction="column" spacing={2} alignContent="stretch">
      <Button
        disabled={disabled}
        onPress={onGooglePress}
        mode="contained"
        icon="google"
      >
        Zaloguj się przez Google
      </Button>

      <Button
        disabled={disabled}
        onPress={onApplePress}
        mode="contained"
        icon="apple"
      >
        Zaloguj się przez Apple
      </Button>
    </Flex>
  )
}

export default SocialButtons
