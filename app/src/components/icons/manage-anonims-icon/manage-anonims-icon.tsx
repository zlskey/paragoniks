import { getPx } from '@app/styles'
import IconButton from '@components/icon-button'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { router } from 'expo-router'
import { useTheme } from 'react-native-paper'

function ManageAnonimsIcon() {
  const { colors } = useTheme()
  function handlePress() {
    router.push({
      pathname: '/(tabs)/friends/manage-anonim',
    })
  }
  return (
    <IconButton
      onPress={handlePress}
      icon={
        <FontAwesome name="user-secret" size={getPx(2.3)} color={colors.onBackground} />
      }
    />
  )
}

export default ManageAnonimsIcon
