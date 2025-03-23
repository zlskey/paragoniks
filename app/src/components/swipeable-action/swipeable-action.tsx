import Flex from '@components/flex'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Typography from '@components/typography'
import { colors } from 'src/app/styles'

interface SwipeableActionProps {
  label: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  onClick?: () => void
  color?: 'red' | 'blue' | 'default'
  left?: boolean
}

const getColor = (color: SwipeableActionProps['color']) => {
  switch (color) {
    case 'red':
      return colors.red
    case 'blue':
      return colors.primary
    default:
      return colors.background
  }
}

const SwipeableAction = ({
  label,
  startIcon,
  endIcon,
  onClick,
  color,
  left,
}: SwipeableActionProps) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <Flex
        pr={2}
        pl={2}
        spacing={1}
        alignContent='center'
        justifyContent={left ? undefined : 'flex-end'}
        styles={{
          width: '100%',
          height: '100%',
          backgroundColor: getColor(color),
        }}
      >
        {startIcon}

        <Typography>{label}</Typography>

        {endIcon}
      </Flex>
    </TouchableOpacity>
  )
}

export default SwipeableAction
