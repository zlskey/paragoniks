import { colors, getPx } from 'src/app/styles'
import { router, useLocalSearchParams } from 'expo-router'

import { AntDesign } from '@expo/vector-icons'
import IconButton from '@components/icon-button'

const AddContributorIcon = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  return (
    <IconButton
      icon={<AntDesign name='adduser' size={getPx(2.3)} color={colors.text} />}
      onPress={() =>
        router.push({
          pathname: '/receipt/[id]/add-contributors',
          params: { id },
        })
      }
    />
  )
}

export default AddContributorIcon
