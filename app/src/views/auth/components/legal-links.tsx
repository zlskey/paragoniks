import type { MD3Colors } from 'react-native-paper/lib/typescript/types'
import Typography from '@components/typography'
import { Linking, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

interface LegalLinksProps {
  onTermsPress?: () => void
  onPrivacyPolicyPress?: () => void
  onCookiePolicyPress?: () => void
}

function LegalLinks({
  onTermsPress = () => Linking.openURL('https://www.google.com'),
  onPrivacyPolicyPress = () => Linking.openURL('https://www.google.com'),
  onCookiePolicyPress = () => Linking.openURL('https://www.google.com'),
}: LegalLinksProps) {
  const { colors } = useTheme()
  const styles = getStyles(colors)

  return (
    <Typography styles={{ color: colors.onSurfaceVariant }}>
      Rejestrując się, akceptujesz nasze
      {' '}
      <Typography
        styles={styles.link}
        onPress={onTermsPress}
      >
        Warunki
      </Typography>
      ,
      {' '}
      <Typography
        styles={styles.link}
        onPress={onPrivacyPolicyPress}
      >
        Politykę prywatności
      </Typography>
      {' '}
      oraz
      {' '}
      <Typography
        styles={styles.link}
        onPress={onCookiePolicyPress}
      >
        zasady dotyczące plików cookie
      </Typography>
      .
    </Typography>
  )
}

function getStyles(colors: MD3Colors) {
  return StyleSheet.create({
    link: {
      color: colors.primary,
    },
  })
}

export default LegalLinks
