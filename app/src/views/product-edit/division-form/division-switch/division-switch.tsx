import { DivisionTranslationEnum, DivisionType } from 'src/app/generic.types'

import { EvilIcons } from '@expo/vector-icons'
import Flex from '@components/flex'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Typography from '@components/typography'
import { colors } from 'src/app/styles'
import useSplitByDrawer from './split-by-drawer/use-split-by-drawer'

interface DivisionSwitchProps {
  divisionType: DivisionType
  onDivisionTypeChange: (newDivisionType: DivisionType) => void
}

function DivisionSwitch({
  divisionType,
  onDivisionTypeChange,
}: DivisionSwitchProps) {
  const { drawerComponent, expandDrawer } =
    useSplitByDrawer(onDivisionTypeChange)

  return (
    <>
      <TouchableOpacity onPress={expandDrawer}>
        <Flex alignContent='center'>
          <Typography styles={{ color: colors.primary }}>
            {DivisionTranslationEnum[divisionType]}
          </Typography>

          <EvilIcons name='chevron-down' size={20} color={colors.primary} />
        </Flex>
      </TouchableOpacity>

      {drawerComponent}
    </>
  )
}

export default DivisionSwitch
