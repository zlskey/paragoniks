import type { MD3Colors } from 'react-native-paper/lib/typescript/types'
import Avatar from '@components/avatar'
import Flex from '@components/flex'
import Typography from '@components/typography'
import { useUserContext } from '@helpers/contexts/user.context'
import { router } from 'expo-router'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { getPx } from 'src/app/styles'

function getStyles(colors: MD3Colors) {
  return StyleSheet.create({
    container: {
      padding: getPx(2),
      backgroundColor: colors.background,
    },
  })
}

interface MainHeaderProps {
  title: string
  endAdornment?: React.ReactNode
  onSearch?: (query: string) => void
}

function MainHeader({ title, endAdornment }: MainHeaderProps) {
  const { colors } = useTheme()
  const { user } = useUserContext()
  const styles = getStyles(colors)
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      styles={styles.container}
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
