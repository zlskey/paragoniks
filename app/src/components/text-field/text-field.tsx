import type { FieldError } from 'react-hook-form'
import type { TextInputProps } from 'react-native'
import type { MD3Colors } from 'react-native-paper/lib/typescript/types'
import Typography from '@components/typography'
import { useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { getPx } from 'src/app/styles'

export interface TextFieldProps extends TextInputProps {
  name: string
  label: string
  fullWidth?: boolean
  error?: FieldError
  labelAlwaysOnTop?: boolean
}

function getStyles(colors: MD3Colors) {
  return StyleSheet.create({
    labelDefault: {
      position: 'absolute',
      left: 0,
      color: colors.onBackground,
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
      backgroundColor: colors.surface,
      color: colors.onBackground,
      fontSize: getPx(2),
      padding: getPx(1),
      borderRadius: getPx(1),
    },
    inputWithError: {
      borderColor: colors.error,
      borderWidth: 1,
    },
  })
}
function TextField({
  name,
  label,
  fullWidth,
  style,
  error,
  labelAlwaysOnTop = false,
  ...props
}: TextFieldProps) {
  const { colors } = useTheme()
  const form = useFormContext()

  const ref = useRef<TextInput | null>(null)

  const [isFilled, setIsFilled] = useState(false)

  const [isFocused, setIsFocused] = useState(false)

  const focusTextInput = () => {
    ref.current?.focus()
  }

  const styles = getStyles(colors)

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
          isFocused || isFilled || labelAlwaysOnTop ? styles.labelFocused : styles.labelBlured,
        ]}
        variant={isFocused || isFilled || labelAlwaysOnTop ? 'base1' : 'subtitle'}
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
                setIsFilled(text !== '')
                onChange(text)
              }}
              onBlur={() => {
                setIsFocused(false)
                onBlur()
              }}
              placeholderTextColor={colors.onSurfaceVariant}
              style={[styles.input, error && styles.inputWithError, style]}
              {...props}
            />
          )
        }}
      />

      {error && (
        <Typography variant="base2" styles={{ color: colors.error }}>
          {error.message}
        </Typography>
      )}
    </View>
  )
}

export default TextField
