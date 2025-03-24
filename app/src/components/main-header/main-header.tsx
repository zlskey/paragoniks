import Avatar from '@components/avatar'

import Flex from '@components/flex'
import Typography from '@components/typography'
import { useUserContext } from '@helpers/contexts/user.context'
import { router } from 'expo-router'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors, getPx } from 'src/app/styles'

const styles = StyleSheet.create({
  container: {
    padding: getPx(2),
    backgroundColor: colors.background,
  },
})

interface MainHeaderProps {
  title: string
  endAdornment?: React.ReactNode
  onSearch?: (query: string) => void
}

function MainHeader({ title, endAdornment }: MainHeaderProps) {
  const { user } = useUserContext()

  return (
    <Flex
      pt={5}
      direction="row"
      styles={styles.container}
      justifyContent="space-between"
    >
      <Flex direction="column" spacing={2}>
        <TouchableOpacity onPress={() => router.push({ pathname: '/profile' })}>
          <Avatar profile={user} size="sm" />
        </TouchableOpacity>

        <Typography variant="title">{title}</Typography>
      </Flex>

      {endAdornment}
    </Flex>
  )
}

export default MainHeader
