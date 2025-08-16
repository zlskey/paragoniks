import Flex from '@components/flex'
import Typography from '@components/typography'
import { useTheme } from 'react-native-paper'

interface DividerProps {
  text?: string
}

function Divider({ text = 'lub' }: DividerProps) {
  const { colors } = useTheme()

  return (
    <Flex
      pr={2}
      pl={2}
      spacing={1}
      alignContent="center"
      justifyContent="center"
    >
      <Flex
        nativeFlex
        styles={{ height: 1, backgroundColor: colors.onSurfaceVariant }}
      />
      <Typography styles={{ color: colors.onSurfaceVariant }}>
        {text}
      </Typography>
      <Flex
        nativeFlex
        styles={{ height: 1, backgroundColor: colors.onSurfaceVariant }}
      />
    </Flex>
  )
}

export default Divider
