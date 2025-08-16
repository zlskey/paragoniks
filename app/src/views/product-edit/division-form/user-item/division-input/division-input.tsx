import type { MD3Colors } from 'react-native-paper/lib/typescript/types'
import type { Division, DivisionType } from 'src/app/generic.types'
import Color from 'color'
import { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { useTheme } from 'react-native-paper'
import { DivisionUnitEnum } from 'src/app/generic.types'
import { getPx } from 'src/app/styles'

function isNumber(value: number | null | undefined): value is number {
  return typeof value === 'number' ? !Number.isNaN(value) : false
}

function inputStylesObj(colors: MD3Colors) {
  return {
    borderBottomColor: Color(colors.surface).lighten(1).hex(),
    borderBottomWidth: 1,
    color: colors.onBackground,
    paddingHorizontal: getPx(1),
    position: 'relative' as const,
  }
}

function getDivisionInputStyles(colors: MD3Colors) {
  return StyleSheet.create({
    input: inputStylesObj(colors),
    inputFocused: {
      ...inputStylesObj(colors),
      borderBottomColor: colors.primary,
    },
    inputDisabled: {
      ...inputStylesObj,
      color: Color(colors.surface).lighten(1).hex(),
    },
  })
}

interface DivisionInputProps {
  profileId: string
  division: Division
  divisionType: DivisionType
  onDivisionValueChange: (profileId: string, value: string) => void
}

function DivisionInput({
  division,
  profileId,
  divisionType,
  onDivisionValueChange,
}: DivisionInputProps) {
  const { colors } = useTheme()
  const [isFocused, setIsFocused] = useState(false)

  const value = division[profileId]
  const unit = DivisionUnitEnum[divisionType]

  function handleChange(value: string) {
    onDivisionValueChange(profileId, value)
  }

  /**
   * @todo - add unit handlings
   */
  function getValueToRender(value: number | null) {
    if (isNumber(value)) {
      return `${value}`
    }

    return ''
  }

  function onFocus() {
    setIsFocused(true)
  }

  function onBlur() {
    setIsFocused(false)
  }

  const styles = getDivisionInputStyles(colors)

  return (
    <TextInput
      style={
        value === null
          ? styles.inputDisabled
          : isFocused
            ? styles.inputFocused
            : styles.input
      }
      editable={typeof value === 'number'}
      value={getValueToRender(value)}
      onChangeText={handleChange}
      keyboardType="decimal-pad"
      placeholder={unit}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default DivisionInput
