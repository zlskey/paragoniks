import type { PropsWithChildren } from 'react'
import Flex from '@components/flex'
import Typography from '@components/typography'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors, getPx } from 'src/app/styles'

interface ButtonProps extends PropsWithChildren {
  onPress?: () => void
  isDisabled?: boolean
  variant?: 'contained' | 'outlined'
  style?: Record<string, unknown>
  small?: boolean
  startIcon?: React.JSX.Element
  endIcon?: React.JSX.Element
}

function disabledStyles(isDisabled?: boolean) {
  if (isDisabled) {
    return {
      opacity: 0.5,
    }
  }

  return {}
}

function getSizeStyles(small?: boolean) {
  if (small) {
    return {
      borderRadius: getPx(1),
      paddingHorizontal: getPx(2),
      paddingVertical: getPx(1),
    }
  }

  return {
    paddingVertical: getPx(1),
    borderRadius: getPx(3),
  }
}

const styles = StyleSheet.create({
  contained: {
    backgroundColor: colors.primary,
  },
  outlined: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
})

function Button({
  children,
  onPress,
  isDisabled,
  small,
  style = {},
  variant = 'contained',
  startIcon,
  endIcon,
}: ButtonProps) {
  const variantStyle
    = variant === 'contained' ? styles.contained : styles.outlined
  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled}>
      <Flex
        justifyContent="center"
        alignContent="center"
        spacing={1}
        styles={{
          ...variantStyle,
          ...getSizeStyles(small),
          ...disabledStyles(isDisabled),
          ...style,
        }}
      >
        {startIcon}
        <Typography>{children}</Typography>
        {endIcon}
      </Flex>
    </TouchableOpacity>
  )
}

export default Button
