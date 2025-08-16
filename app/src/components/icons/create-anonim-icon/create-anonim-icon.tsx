import { getPx } from '@app/styles'
import IconButton from '@components/icon-button'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { router } from 'expo-router'
import { useTheme } from 'react-native-paper'

function CreateAnonimsIcon({ type }: { type: 'tabs' | 'screen' }) {
  const { colors } = useTheme()
  function handlePress() {
    router.push({
      pathname:
        type === 'tabs'
          ? '/(tabs)/friends/manage-anonim/create-anonim'
          : '/receipt/[id]/add-contributors/create-anonim',
      params: {
        id: '123',
      },
    })
  }
  return (
    <IconButton
      onPress={handlePress}
      icon={<FontAwesome6 name="add" size={getPx(2.3)} color={colors.onBackground} />}
    />
  )
}

export default CreateAnonimsIcon
