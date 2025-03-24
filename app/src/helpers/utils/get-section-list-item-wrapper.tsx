import { getPx } from '@app/styles'
import { View } from 'react-native'

function getSectionListItemWrapper(
  index: number,
  length: number,
  item: JSX.Element,
) {
  const isFirst = index === 0
  const isLast = length === index + 1
  const topRadius = isFirst ? getPx(1) : 0
  const bottomRadius = isLast ? getPx(1) : 0
  const bottomMargin = isLast ? getPx(2) : 0

  return (
    <View
      style={{
        overflow: 'hidden' as const,
        marginBottom: bottomMargin,
        borderTopEndRadius: topRadius,
        borderTopStartRadius: topRadius,
        borderBottomEndRadius: bottomRadius,
        borderBottomStartRadius: bottomRadius,
      }}
    >
      {item}
    </View>
  )
}

export default getSectionListItemWrapper
