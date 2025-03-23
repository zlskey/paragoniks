import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import React, { useCallback, useMemo } from 'react'

import { DivisionType } from 'src/app/generic.types'
import Flex from '@components/flex'
import { FontAwesome } from '@expo/vector-icons'
import Paper from '@components/paper'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Typography from '@components/typography'
import { colors } from 'src/app/styles'

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

interface OptionItemProps {
  icon: React.JSX.Element
  label: string
  onPress: () => void
  isSelected: boolean
  description: string
}

function OptionItem({
  icon,
  label,
  onPress,
  isSelected,
  description,
}: OptionItemProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Flex
        styles={{
          backgroundColor: isSelected ? 'rgba(67, 160, 71, 0.1)' : undefined,
          borderRadius: 4,
        }}
        justifyContent='space-between'
        alignContent='center'
        p={1}
      >
        <Flex spacing={1} alignContent='center'>
          <Flex
            styles={{
              backgroundColor: '#e8f5e9',
              borderRadius: 999,
            }}
            p={1}
            alignContent='center'
            justifyContent='center'
            direction='column'
          >
            {icon}
          </Flex>

          <Flex direction='column'>
            <Typography variant='base1'>{label}</Typography>

            <Typography opacity variant='base2'>
              {description}
            </Typography>
          </Flex>
        </Flex>

        {isSelected && (
          <FontAwesome5 color={colors.primary} name='check' size={16} />
        )}
      </Flex>
    </TouchableOpacity>
  )
}

interface SplitByDrawerProps {
  bottomSheetRef: React.RefObject<BottomSheetModal>
  onChangeDivisionType: (newDivision: DivisionType) => void
  divisionType: DivisionType
}

function SplitByDrawer({
  bottomSheetRef,
  onChangeDivisionType,
  divisionType,
}: SplitByDrawerProps) {
  const handleSheetChanges = useCallback((index: number) => {
    console.log(index)
  }, [])

  const snapPoints = useMemo(() => [220], [])

  const handleDivisionTypeChange = useCallback(
    (newDivisionType: DivisionType) => {
      onChangeDivisionType(newDivisionType)
      bottomSheetRef.current?.dismiss()
    },
    [bottomSheetRef, onChangeDivisionType]
  )

  return (
    <BottomSheetModal
      enablePanDownToClose
      containerStyle={styles.container}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.background}
      handleStyle={styles.handle}
      style={styles.bottomSheet}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
    >
      <BottomSheetView style={{ backgroundColor: colors.paper }}>
        <Flex
          direction='column'
          pr={1.5}
          pl={1.5}
          alignContent='stretch'
          spacing={1}
        >
          <Typography variant='subtitle'>Opcje podziału</Typography>

          <Paper styles={{ backgroundColor: '#2c2c2c' }}>
            <Flex p={0.5} direction='column' alignContent='stretch'>
              <OptionItem
                label='Kwota'
                description='Określ podział kwotowo'
                isSelected={divisionType === 'amount'}
                onPress={() => handleDivisionTypeChange('amount')}
                icon={
                  <FontAwesome5 color={colors.primary} name='check' size={16} />
                }
              />

              <OptionItem
                label='Procent'
                description='Podziel na procenty'
                isSelected={divisionType === 'percentage'}
                onPress={() => handleDivisionTypeChange('percentage')}
                icon={
                  <FontAwesome
                    color={colors.primary}
                    name='percent'
                    size={16}
                  />
                }
              />

              <OptionItem
                label='Udział'
                description='Podziel według udziału'
                isSelected={divisionType === 'shares'}
                onPress={() => handleDivisionTypeChange('shares')}
                icon={
                  <Entypo color={colors.primary} name='bar-graph' size={16} />
                }
              />
            </Flex>
          </Paper>
        </Flex>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

export default SplitByDrawer
