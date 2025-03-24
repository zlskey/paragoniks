import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from 'src/app/styles'

function GoBackIcon() {
  const router = useRouter()

  function goBack() {
    if (router.canGoBack()) {
      router.back()
    }
  }

  return (
    <TouchableOpacity onPress={goBack}>
      <Ionicons name="arrow-back" size={24} color={colors.text} />
    </TouchableOpacity>
  )
}

export default GoBackIcon
