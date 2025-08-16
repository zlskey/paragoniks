import type { ButtonProps } from 'react-native-paper'
import Typography from '@components/typography'
import { Button } from 'react-native-paper'
import { getPx } from 'src/app/styles'

function SmallButton({ children, style, ...props }: ButtonProps) {
  return (
    <Button
      compact
      mode="contained"
      style={[{ height: getPx(4), justifyContent: 'center', paddingInline: getPx(1) }, style]}
      {...props}
    >
      <Typography variant="subtitle2" styles={{ lineHeight: 0, fontSize: 12 }}>
        {children}
      </Typography>
    </Button>
  )
}

export default SmallButton
