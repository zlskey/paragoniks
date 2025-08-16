import type { MD3Colors } from 'react-native-paper/lib/typescript/types'
import Flex from '@components/flex'
import Typography from '@components/typography'
import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

interface AuthLinkProps {
  text: string
  linkText: string
  onPress: () => void
}

function AuthLink({ text, linkText, onPress }: AuthLinkProps) {
  const { colors } = useTheme()
  const styles = getStyles(colors)

  return (
    <Flex>
      <Typography variant="subtitle2" styles={{ color: colors.onSurfaceVariant }}>
        {text}
      </Typography>
      <Typography variant="subtitle2">{' '}</Typography>
      <Typography
        variant="subtitle2"
        onPress={onPress}
        styles={styles.link}
      >
        {linkText}
      </Typography>
    </Flex>
  )
}

function getStyles(colors: MD3Colors) {
  return StyleSheet.create({
    link: {
      color: colors.primary,
    },
  })
}

export default AuthLink
