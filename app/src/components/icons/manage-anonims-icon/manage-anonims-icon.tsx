import { colors, getPx } from '@app/styles'
import IconButton from '@components/icon-button'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { router } from 'expo-router'

function ManageAnonimsIcon() {
  function handlePress() {
    router.push({
      pathname: '/(tabs)/friends/manage-anonim/',
    })
  }
  return (
    <IconButton
      onPress={handlePress}
      icon={
        <FontAwesome name="user-secret" size={getPx(2.3)} color={colors.text} />
      }
    />
  )
}

export default ManageAnonimsIcon
