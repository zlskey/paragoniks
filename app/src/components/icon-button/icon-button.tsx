import Button from '@components/button'
import React from 'react'
import { getPx } from 'src/app/styles'

interface IconButtonProps {
  icon?: JSX.Element
  onPress?: () => void
}

function IconButton({ icon, onPress }: IconButtonProps) {
  return (
    <Button
      onPress={onPress}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: getPx(5),
        height: getPx(4),
        width: getPx(4),
        paddingVertical: 0,
      }}
    >
      {icon}
    </Button>
  )
}

export default IconButton
