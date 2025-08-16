import type { StyleProp, ViewStyle } from 'react-native'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { getPx } from 'src/app/styles'

interface WrapperProps {
  style?: StyleProp<ViewStyle>
}

function Wrapper({ children, style }: React.PropsWithChildren<WrapperProps>) {
  const { colors } = useTheme()

  return (
    <View
      style={[{
        backgroundColor: colors.background,
        padding: getPx(2),
        paddingTop: getPx(1),
        paddingBottom: getPx(4),
        flexGrow: 1,
        flex: 1,
      }, style]}
    >
      {children}
    </View>
  )
}

export default Wrapper
