import type { MD3Colors } from 'react-native-paper/lib/typescript/types'
import Flex from '@components/flex'
import GoBackIcon from '@components/icons/go-back-icon/go-back-icon'
import Typography from '@components/typography'
import { Skeleton } from 'moti/skeleton'
import { StyleSheet } from 'react-native'
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

interface StackHeaderProps {
  title?: string
  onGoBack?: () => void
  endAdornment?: React.ReactNode
}

function StackHeader({ title, endAdornment, onGoBack }: StackHeaderProps) {
  const { colors } = useTheme()
  const styles = getStyles(colors)
  return (
    <Flex
      alignContent="center"
      styles={styles.container}
      justifyContent="space-between"
    >
      <Flex spacing={1} alignContent="center">
        <GoBackIcon overwriteOnClick={onGoBack} />
        {title !== undefined
          ? (
              <Typography variant="title">{title}</Typography>
            )
          : (
              <Skeleton width={getPx(10)} height={getPx(3.3)} />
            )}
      </Flex>
      {endAdornment}
    </Flex>
  )
}

export default StackHeader
