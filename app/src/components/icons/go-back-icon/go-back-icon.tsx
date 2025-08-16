import type { StyleProp, ViewStyle } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

interface GoBackIconProps {
  overwriteOnClick?: () => void
  style?: StyleProp<ViewStyle>
}

function GoBackIcon({ overwriteOnClick, style }: GoBackIconProps) {
  const { colors } = useTheme()
  const router = useRouter()

  function goBack() {
    if (overwriteOnClick) {
      overwriteOnClick()
      return
    }

    if (router.canGoBack()) {
      router.back()
    }
  }

  return (
    <TouchableOpacity onPress={goBack} style={style}>
      <Ionicons name="arrow-back" size={24} color={colors.onBackground} />
    </TouchableOpacity>
  )
}

export default GoBackIcon
