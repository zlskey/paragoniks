import type { ButtonProps } from 'react-native-paper'
import { Button } from 'react-native-paper'
import { getPx } from 'src/app/styles'

function SmallButton({ children, style, ...props }: ButtonProps) {
  return (
    <Button
      compact
      mode="contained"
      labelStyle={[{ fontSize: 12, height: getPx(2.5) }]}
      style={[{ height: getPx(4), justifyContent: 'center', paddingInline: getPx(1) }, style]}
      {...props}
    >
      {children}
    </Button>
  )
}

export default SmallButton
