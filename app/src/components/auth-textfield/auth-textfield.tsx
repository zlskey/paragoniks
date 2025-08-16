import type { FieldError } from 'react-hook-form'
import type { TextInputProps } from 'react-native'
import type { MD3Colors } from 'react-native-paper/lib/typescript/types'
import Typography from '@components/typography'
import { FontAwesome } from '@expo/vector-icons'
import { useEffect, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ActivityIndicator, Animated, StyleSheet, TextInput, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { getPx } from 'src/app/styles'

export type AuthTextFieldStatus = 'valid' | 'error' | 'info'

export interface AuthTextFieldProps extends TextInputProps {
  name: string
  label: string
  fullWidth?: boolean
  error?: FieldError
  labelAlwaysOnTop?: boolean
  status?: AuthTextFieldStatus
  isLoading?: boolean
  info?: string
}

function getStyles(colors: MD3Colors) {
  return StyleSheet.create({
    container: {
      position: 'relative',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.onBackground,
      paddingVertical: getPx(1),
      marginBottom: getPx(0.5),
      overflow: 'hidden',
    },
    input: {
      flex: 1,
      backgroundColor: 'transparent',
      color: colors.onBackground,
      fontSize: getPx(2),
      paddingTop: getPx(1),
      paddingHorizontal: 0,
      outline: 'none',
      outlineWidth: 0,
      outlineStyle: undefined,
      outlineColor: 'transparent',
      boxShadow: 'none',
    },
    label: {
      position: 'absolute',
      left: 0,
      top: getPx(-0.5),
      color: colors.onBackground,
      fontSize: getPx(1.5),
      opacity: 0.7,
    },
    statusContainer: {
      width: getPx(3),
      height: getPx(3),
      borderRadius: getPx(1.5),
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: getPx(1),
    },
    statusValid: {
      backgroundColor: colors.primary,
    },
    statusError: {
      backgroundColor: colors.error,
    },
    statusInfo: {
      backgroundColor: '#3b82f6',
    },
    messageContainer: {
      position: 'relative',
      marginTop: getPx(0.5),
      paddingVertical: getPx(1),
      paddingHorizontal: getPx(1),
    },
    messageContainerIndicator: {
      position: 'absolute',
      left: getPx(0.5),
      top: (getPx(0.25) ?? 0) * -2,
      width: getPx(1),
      height: getPx(1),
      transform: [{ rotate: '45deg' }],
    },
    errorMessage: {
      backgroundColor: colors.error,
    },
    infoMessage: {
      backgroundColor: '#3b82f6',
    },
  })
}

function AuthTextField({
  name,
  label,
  fullWidth,
  style,
  error,
  labelAlwaysOnTop = false,
  status,
  isLoading = false,
  info,
  placeholder,
  ...props
}: AuthTextFieldProps) {
  const { colors } = useTheme()
  const styles = getStyles(colors)
  const form = useFormContext()
  const ref = useRef<TextInput | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState('')
  const labelOpacity = useRef(new Animated.Value(0)).current

  const hasValue = value.length > 0
  const shouldShowLabel = hasValue || isFocused || labelAlwaysOnTop
  const shouldShowPlaceholder = !hasValue && !shouldShowLabel

  useEffect(() => {
    Animated.timing(labelOpacity, {
      toValue: shouldShowLabel ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }, [shouldShowLabel, labelOpacity])

  function getStatusIcon() {
    if (isLoading) {
      return (
        <View style={[styles.statusContainer, { backgroundColor: 'transparent' }]}>
          <ActivityIndicator size="small" color={colors.onBackground} />
        </View>
      )
    }

    if (!status)
      return null

    const iconName = status === 'valid'
      ? 'check'
      : status === 'error'
        ? 'close'
        : 'info'

    const statusStyle
      = status === 'valid'
        ? styles.statusValid
        : status === 'error'
          ? styles.statusError
          : styles.statusInfo

    return (
      <View style={[styles.statusContainer, statusStyle]}>
        <FontAwesome name={iconName} size={getPx(1.5)} color="white" />
      </View>
    )
  }

  function renderMessage() {
    if (isLoading) {
      return null
    }

    if (status === 'error' && error?.message) {
      return (
        <View style={[styles.messageContainer, styles.errorMessage]}>
          <View style={[styles.messageContainerIndicator, styles.errorMessage]} />
          <Typography>{error.message}</Typography>
        </View>
      )
    }

    if (status === 'info' && info) {
      return (
        <View style={[styles.messageContainer, styles.infoMessage]}>
          <View style={[styles.messageContainerIndicator, styles.infoMessage]} />
          <Typography>{info}</Typography>
        </View>
      )
    }

    return null
  }

  return (
    <View
      style={[
        styles.container,
        { marginTop: getPx(1.5) },
      ]}
    >
      {shouldShowLabel && (
        <Animated.View style={{ opacity: labelOpacity }}>
          <Typography variant="base2" styles={styles.label}>
            {label}
          </Typography>
        </Animated.View>
      )}

      <View style={styles.inputContainer}>
        <Controller
          name={name}
          control={form.control}
          render={({ field: { onChange, onBlur, value: fieldValue } }) => (
            <TextInput
              ref={ref}
              value={fieldValue?.toString() || ''}
              onChangeText={(text) => {
                setValue(text)
                onChange(text)
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false)
                onBlur()
              }}
              placeholder={shouldShowPlaceholder ? placeholder ?? label : undefined}
              placeholderTextColor={colors.onSurfaceVariant}
              style={[styles.input, style]}
              {...props}
            />
          )}
        />
        {getStatusIcon()}
      </View>

      {renderMessage()}
    </View>
  )
}

export default AuthTextField
