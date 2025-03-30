import type { FieldError } from 'react-hook-form'
import type { TextInputProps } from 'react-native'
import Typography from '@components/typography'
import React, { useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'

import { colors, getPx } from 'src/app/styles'

export interface TextFieldProps extends TextInputProps {
  name: string
  label: string
  fullWidth?: boolean
  error?: FieldError
}

const styles = StyleSheet.create({
  labelDefault: {
    position: 'absolute',
    left: 0,
    color: colors.text,
    zIndex: 1,
    opacity: 0.5,
    pointerEvents: 'none',
    flex: 1,
    display: 'flex',
  },
  labelBlured: {
    transform: [{ translateX: getPx(1) || 0 }, { translateY: getPx(1) || 0 }],
  },
  labelFocused: {
    opacity: 1,
    transform: [{ translateY: getPx(-2.3) || 0 }],
  },
  input: {
    backgroundColor: colors.paper,
    color: colors.text,
    fontSize: getPx(2),
    padding: getPx(1),
    borderRadius: getPx(1),
  },
  inputWithError: {
    borderColor: colors.red,
    borderWidth: 1,
  },
})

function TextField({
  name,
  label,
  fullWidth,
  style,
  error,
  ...props
}: TextFieldProps) {
  const form = useFormContext()

  const ref = useRef<TextInput | null>(null)

  const [isFilled, setIsFilled] = useState(false)

  const [isFocused, setIsFocused] = useState(false)

  const focusTextInput = () => {
    ref.current?.focus()
  }

  return (
    <View
      style={{
        flex: fullWidth ? 1 : undefined,
        position: 'relative',
        marginTop: getPx(1.5),
      }}
    >
      <Typography
        onPress={focusTextInput}
        styles={[
          styles.labelDefault,
          isFocused || isFilled ? styles.labelFocused : styles.labelBlured,
        ]}
        variant={isFocused || isFilled ? 'base1' : 'subtitle'}
      >
        {label}
      </Typography>

      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              ref={ref}
              onFocus={() => setIsFocused(true)}
              value={value?.toString()}
              onChangeText={(text) => {
                setIsFilled(!!text)
                onChange(text)
              }}
              onBlur={() => {
                setIsFocused(false)
                onBlur()
              }}
              placeholderTextColor={colors.placeholder}
              style={[styles.input, error && styles.inputWithError, style]}
              {...props}
            />
          )
        }}
      />

      {error && (
        <Typography variant="base2" styles={{ color: colors.red }}>
          {error.message}
        </Typography>
      )}
    </View>
  )
}

export default TextField
