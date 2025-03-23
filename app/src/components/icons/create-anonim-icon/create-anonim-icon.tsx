import { colors, getPx } from '@app/styles'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import IconButton from '@components/icon-button'
import { router } from 'expo-router'

function CreateAnonimsIcon({ type }: { type: 'tabs' | 'screen' }) {
  function handlePress() {
    router.push({
      pathname:
        type === 'tabs'
          ? '/(tabs)/friends/manage-anonim/create-anonim'
          : '/receipt/[id]/add-contributors/create-anonim',
    })
  }
  return (
    <IconButton
      onPress={handlePress}
      icon={<FontAwesome6 name='add' size={getPx(2.3)} color={colors.text} />}
    />
  )
}

export default CreateAnonimsIcon
