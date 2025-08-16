import type { BottomSheetModalProps } from '@gorhom/bottom-sheet'
import type { MD3Colors } from 'react-native-paper/lib/typescript/types'
import Flex from '@components/flex'
import Typography from '@components/typography'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { forwardRef, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

export type UseDrawerFunctionsRef = React.RefObject<BottomSheetModal>

export function useDrawerFunctions() {
  const ref = useRef<BottomSheetModal>(null)
  return ref as UseDrawerFunctionsRef
}

function getStyles(colors: MD3Colors) {
  return StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    handleIndicator: {
      backgroundColor: colors.onBackground,
    },
    background: {
      backgroundColor: colors.surface,
      opacity: 1,
    },
    handle: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      overflow: 'hidden',
    },
    bottomSheet: {
      backgroundColor: colors.surface,
    },
  })
}

interface DrawerProps extends BottomSheetModalProps {
  title: string
  onSnapPointChange?: (point: number) => void
}

const Drawer = forwardRef<BottomSheetModal, React.PropsWithChildren<DrawerProps>>((
  { title, children, onSnapPointChange, ...props },
  ref,
) => {
  const { colors } = useTheme()
  const styles = getStyles(colors)

  return (
    <BottomSheetModal
      {...props}
      ref={ref}
      enablePanDownToClose
      style={styles.bottomSheet}
      handleStyle={styles.handle}
      onChange={onSnapPointChange}
      containerStyle={styles.container}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={{ backgroundColor: colors.surface }}>
        <Flex
          pr={1.5}
          pl={1.5}
          pb={2}
          spacing={1}
          direction="column"
          alignContent="stretch"
        >
          <Typography variant="subtitle">{title}</Typography>
          <View>{children}</View>
        </Flex>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

export default Drawer
