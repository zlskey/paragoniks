import type { PropsWithChildren } from 'react'
import type { StyleProp, TextProps, TextStyle } from 'react-native'
import { Text } from 'react-native'
import { useTheme } from 'react-native-paper'
import { getPx } from 'src/app/styles'

type TypographyVariant = 'subtitle' | 'subtitle2' | 'base1' | 'base2' | 'title' | 'display'

interface TypographyProps extends TextProps, PropsWithChildren {
  variant?: TypographyVariant
  opacity?: boolean
  styles?: StyleProp<TextStyle>
}

function getTypographyStyle({ variant, opacity, colors }: TypographyProps & { colors: any }) {
  const getFontSize = () => {
    switch (variant) {
      case 'display':
        return getPx(3)
      case 'title':
        return getPx(2.5)
      case 'subtitle':
        return getPx(2)
      case 'subtitle2':
        return getPx(1.75)
      case 'base2':
        return getPx(1.25)
      case 'base1':
      default:
        return getPx(1.5)
    }
  }

  return {
    fontFamily: 'Poppins-Medium',
    color: colors.onBackground,
    fontSize: getFontSize(),
    opacity: opacity ? 0.5 : 1,
  }
}

function Typography({
  children,
  variant = 'base1',
  opacity,
  styles,
  ...props
}: TypographyProps) {
  const { colors } = useTheme()
  const typographyStyle = getTypographyStyle({ variant, opacity, colors })

  return (
    <Text {...props} style={[typographyStyle, styles]}>
      {children}
    </Text>
  )
}

export default Typography
