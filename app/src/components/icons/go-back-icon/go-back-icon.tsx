import Ionicons from '@expo/vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from 'src/app/styles'
import { useRouter } from 'expo-router'

function GoBackIcon() {
  const router = useRouter()

  function goBack() {
    if (router.canGoBack()) {
      router.back()
    }
  }

  return (
    <TouchableOpacity onPress={goBack}>
      <Ionicons name='arrow-back' size={24} color={colors.text} />
    </TouchableOpacity>
  )
}

export default GoBackIcon
