import type { DivisionType } from 'src/app/generic.types'
import { useDrawerFunctions } from '@components/drawer'

import SplitByChoiceDrawer from '@components/drawers/split-by-choice/split-by-choice'
import Flex from '@components/flex'
import Typography from '@components/typography'
import { EvilIcons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DivisionTranslationEnum } from 'src/app/generic.types'
import { colors } from 'src/app/styles'

interface DivisionSwitchProps {
  divisionType: DivisionType
  onDivisionTypeChange: (newDivisionType: DivisionType) => void
}

function DivisionSwitch({
  divisionType,
  onDivisionTypeChange,
}: DivisionSwitchProps) {
  const drawerRef = useDrawerFunctions()

  function expandDrawer() {
    drawerRef.current?.present()
  }

  return (
    <>
      <TouchableOpacity onPress={expandDrawer}>
        <Flex alignContent="center">
          <Typography styles={{ color: colors.primary }}>
            {DivisionTranslationEnum[divisionType]}
          </Typography>

          <EvilIcons name="chevron-down" size={20} color={colors.primary} />
        </Flex>
      </TouchableOpacity>

      <SplitByChoiceDrawer
        drawerRef={drawerRef}
        divisionType={divisionType}
        onChangeDivisionType={onDivisionTypeChange}
      />
    </>
  )
}

export default DivisionSwitch
