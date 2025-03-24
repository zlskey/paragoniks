import type { PropsWithChildren, Ref } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { View } from 'react-native'
import { colors, getPx } from '../../app/styles'

interface PaperProps extends PropsWithChildren {
  elevation?: number
  styles?: StyleProp<ViewStyle>
  overflow?: 'hidden' | 'visible'
}

const Paper: React.FC<PaperProps> = React.forwardRef(
  ({ children, styles, overflow }, ref: Ref<View>) => {
    return (
      <View
        ref={ref}
        style={[
          {
            overflow: overflow ?? 'hidden',
            backgroundColor: colors.paper,
            borderRadius: getPx(1),
          },
          styles,
        ]}
      >
        {children}
      </View>
    )
  },
)

export default Paper
