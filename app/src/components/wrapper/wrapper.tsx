import { colors, getPx } from 'src/app/styles'

import React from 'react'
import { View } from 'react-native'

function Wrapper({ children }: React.PropsWithChildren) {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        padding: getPx(2),
        paddingTop: getPx(1),
        paddingBottom: getPx(4),
        flexGrow: 1,
        flex: 1,
      }}
    >
      {children}
    </View>
  )
}

export default Wrapper
