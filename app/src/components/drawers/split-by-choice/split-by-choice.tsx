import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import type { DivisionType } from '@paragoniks/shared'
import { getPx } from '@app/styles'
import Drawer from '@components/drawer/drawer'
import Flex from '@components/flex'
import Paper from '@components/paper'
import Typography from '@components/typography'
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { useCallback } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

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
  const { colors } = useTheme()
  return (
    <TouchableOpacity onPress={onPress}>
      <Flex
        styles={{
          backgroundColor: isSelected ? 'rgba(67, 160, 71, 0.1)' : undefined,
          borderRadius: 4,
        }}
        justifyContent="space-between"
        alignContent="center"
        p={1}
      >
        <Flex spacing={1} alignContent="center">
          <Flex
            styles={{
              backgroundColor: '#e8f5e9',
              borderRadius: 9999,
              height: getPx(4),
              width: getPx(4),
            }}
            alignContent="center"
            justifyContent="center"
            direction="column"
          >
            {icon}
          </Flex>

          <Flex direction="column">
            <Typography variant="base1">{label}</Typography>

            <Typography opacity variant="base2">
              {description}
            </Typography>
          </Flex>
        </Flex>

        {isSelected && (
          <FontAwesome5 color={colors.primary} name="check" size={16} />
        )}
      </Flex>
    </TouchableOpacity>
  )
}

interface SplitByChoiceProps {
  drawerRef: React.RefObject<BottomSheetModal>
  onChangeDivisionType: (newDivision: DivisionType) => void
  divisionType: DivisionType
}

function SplitByChoice({
  drawerRef,
  onChangeDivisionType,
  divisionType,
}: SplitByChoiceProps) {
  const { colors } = useTheme()
  const handleDivisionTypeChange = useCallback(
    (newDivisionType: DivisionType) => {
      onChangeDivisionType(newDivisionType)
      drawerRef.current?.dismiss()
    },
    [drawerRef, onChangeDivisionType],
  )

  return (
    <Drawer
      title="Opcje podziału"
      ref={drawerRef}
    >
      <Paper styles={{ backgroundColor: '#2c2c2c' }}>
        <Flex p={0.5} direction="column" alignContent="stretch">
          <OptionItem
            label="Kwota"
            description="Określ podział kwotowo"
            isSelected={divisionType === 'amount'}
            onPress={() => handleDivisionTypeChange('amount')}
            icon={
              <FontAwesome5 color={colors.primary} name="dollar-sign" size={16} />
            }
          />

          <OptionItem
            label="Procent"
            description="Podziel na procenty"
            isSelected={divisionType === 'percentage'}
            onPress={() => handleDivisionTypeChange('percentage')}
            icon={(
              <FontAwesome
                color={colors.primary}
                name="percent"
                size={16}
              />
            )}
          />

          <OptionItem
            label="Udział"
            description="Podziel według udziału"
            isSelected={divisionType === 'shares'}
            onPress={() => handleDivisionTypeChange('shares')}
            icon={
              <Entypo color={colors.primary} name="bar-graph" size={16} />
            }
          />
        </Flex>
      </Paper>
    </Drawer>
  )
}

export default SplitByChoice
