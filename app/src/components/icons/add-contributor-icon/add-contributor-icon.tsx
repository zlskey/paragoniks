import IconButton from '@components/icon-button'
import { AntDesign } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useTheme } from 'react-native-paper'
import { getPx } from 'src/app/styles'

function AddContributorIcon() {
  const { colors } = useTheme()
  const { id } = useLocalSearchParams<{ id: string }>()
  return (
    <IconButton
      icon={<AntDesign name="adduser" size={getPx(2.3)} color={colors.onBackground} />}
      onPress={() =>
        router.push({
          pathname: '/receipt/[id]/add-contributors',
          params: { id },
        })}
    />
  )
}

export default AddContributorIcon
