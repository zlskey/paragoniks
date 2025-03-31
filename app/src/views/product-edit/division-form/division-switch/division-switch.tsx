import type { DivisionType } from 'src/app/generic.types'
import Flex from '@components/flex'

import Typography from '@components/typography'
import { EvilIcons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DivisionTranslationEnum } from 'src/app/generic.types'
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
  const { drawerComponent, expandDrawer } = useSplitByDrawer(onDivisionTypeChange)

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

      {drawerComponent}
    </>
  )
}

export default DivisionSwitch
