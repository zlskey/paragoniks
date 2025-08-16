import { getPx } from '@app/styles'
import Flex from '@components/flex'
import SmallButton from '@components/small-button'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useTheme } from 'react-native-paper'

function AuthHeader() {
  const { colors } = useTheme()
  function onCancelPress() {
    router.replace('/a')
  }

  return (
    <Flex
      pt={1}
      pl={2}
      pr={2}
      justifyContent="center"
      alignContent="center"
      styles={{ backgroundColor: colors.background }}
    >
      <SmallButton
        mode="text"
        onPress={onCancelPress}
        style={{ position: 'absolute', left: getPx(2), zIndex: 1 }}
      >
        Anuluj
      </SmallButton>

      <Image
        source={require('@assets/images/adaptive-icon.png')}
        style={{ width: 80, height: 80 }}
      />
    </Flex>
  )
}

export default AuthHeader
