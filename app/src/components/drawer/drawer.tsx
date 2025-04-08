import { colors } from '@app/styles'
import Flex from '@components/flex'
import Typography from '@components/typography'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { forwardRef, useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'

export type UseDrawerFunctionsRef = React.RefObject<BottomSheetModal>

export function useDrawerFunctions() {
  const ref = useRef<BottomSheetModal>(null)
  return ref
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  handleIndicator: {
    backgroundColor: colors.text,
  },
  background: {
    backgroundColor: colors.paper,
    opacity: 1,
  },
  handle: {
    backgroundColor: colors.paper,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bottomSheet: {
    backgroundColor: colors.paper,
  },
})

interface DrawerProps {
  title: string
  snapPoints?: number[]
  onDismiss?: () => void
  onSnapPointChange?: (point: number) => void
  enableDynamicSizing?: boolean
}

const Drawer = forwardRef<BottomSheetModal, React.PropsWithChildren<DrawerProps>>((
  { title, children, onSnapPointChange, ...props },
  ref,
) => {
  const handleSheetChanges = useCallback((index: number) => {
    console.log(index)
  }, [onSnapPointChange])

  return (
    <BottomSheetModal
      {...props}
      ref={ref}
      enablePanDownToClose
      style={styles.bottomSheet}
      handleStyle={styles.handle}
      onChange={handleSheetChanges}
      containerStyle={styles.container}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={{ backgroundColor: colors.paper }}>
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
