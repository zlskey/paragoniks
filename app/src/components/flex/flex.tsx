import { StyleProp, View, ViewStyle } from 'react-native'

import React from 'react'
import { getPx } from '../../app/styles'

interface FlexProps {
  direction?: 'row' | 'column'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  spacing?: number
  nativeFlex?: boolean
  p?: number
  pt?: number
  pr?: number
  pb?: number
  pl?: number
  m?: number
  mt?: number
  mr?: number
  mb?: number
  ml?: number
  styles?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

function Flex({
  direction = 'row',
  justifyContent = 'flex-start',
  alignContent = 'flex-start',
  wrap = 'nowrap',
  spacing = 0,
  nativeFlex = false,
  p,
  pt,
  pr,
  pb,
  pl,
  m,
  mt,
  mr,
  mb,
  ml,
  children,
  styles,
}: FlexProps) {
  return (
    <View
      style={[
        {
          display: 'flex',
          flexDirection: direction,
          justifyContent: justifyContent,
          alignItems: alignContent,
          flexWrap: wrap,
          gap: getPx(spacing),
          padding: getPx(p),
          paddingTop: getPx(pt),
          paddingRight: getPx(pr),
          paddingBottom: getPx(pb),
          paddingLeft: getPx(pl),
          margin: getPx(m),
          marginTop: getPx(mt),
          marginRight: getPx(mr),
          marginBottom: getPx(mb),
          marginLeft: getPx(ml),
          flex: nativeFlex ? 1 : undefined,
        },
        styles,
      ]}
    >
      {children}
    </View>
  )
}

export default Flex
