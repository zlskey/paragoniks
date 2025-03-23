import { colors, getPx } from 'src/app/styles'

import { AntDesign } from '@expo/vector-icons'
import IconButton from '@components/icon-button'
import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'

function ChangeTitleIcon() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <IconButton
      icon={<AntDesign name='edit' size={getPx(2.3)} color={colors.text} />}
      onPress={() =>
        router.push({
          pathname: '/receipt/[id]/change-title/',
          params: { id },
        })
      }
    />
  )
}

export default ChangeTitleIcon
