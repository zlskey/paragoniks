import type { ButtonProps } from 'react-native-paper'
import Flex from '@components/flex'
import SmallButton from '@components/small-button'

interface AuthFooterProps {
  leftButtonLabel?: string
  rightButtonLabel?: string
  onLeftButtonPress?: () => void
  onRightButtonPress?: () => void
  leftButtonProps?: Omit<ButtonProps, 'onPress' | 'children'>
  rightButtonProps?: Omit<ButtonProps, 'onPress' | 'children'>
}

function AuthFooter({
  leftButtonLabel,
  rightButtonLabel,
  onLeftButtonPress,
  onRightButtonPress,
  leftButtonProps,
  rightButtonProps,
}: AuthFooterProps) {
  return (
    <Flex
      direction="row-reverse"
      alignContent="flex-end"
      justifyContent="space-between"
      styles={{ flexGrow: 1 }}
    >
      {rightButtonLabel && (
        <SmallButton
          onPress={onRightButtonPress}
          {...rightButtonProps}
        >
          {rightButtonLabel}
        </SmallButton>
      )}
      {leftButtonLabel && (
        <SmallButton
          mode="text"
          onPress={onLeftButtonPress}
          {...leftButtonProps}
        >
          {leftButtonLabel}
        </SmallButton>
      )}
    </Flex>
  )
}

export default AuthFooter
