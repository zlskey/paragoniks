import type { Division, DivisionType } from 'src/app/generic.types'
import Color from 'color'
import { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { DivisionUnitEnum } from 'src/app/generic.types'
import { colors, getPx } from 'src/app/styles'

function isNumber(value: number | null | undefined): value is number {
  return typeof value === 'number' ? !Number.isNaN(value) : false
}

const inputStylesObj = {
  borderBottomColor: Color(colors.paper).lighten(1).hex(),
  borderBottomWidth: 1,
  color: colors.text,
  paddingHorizontal: getPx(1),
  position: 'relative' as const,
}

const DivisionInputStyles = StyleSheet.create({
  input: inputStylesObj,
  inputFocused: {
    ...inputStylesObj,
    borderBottomColor: colors.primary,
  },
  inputDisabled: {
    ...inputStylesObj,
    color: Color(colors.paper).lighten(1).hex(),
  },
})

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

  return (
    <TextInput
      style={
        value === null
          ? DivisionInputStyles.inputDisabled
          : isFocused
            ? DivisionInputStyles.inputFocused
            : DivisionInputStyles.input
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
