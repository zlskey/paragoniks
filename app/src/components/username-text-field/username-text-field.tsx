import type { TextFieldProps } from '@components/text-field/text-field'
import TextField from '@components/text-field'

function UsernameTextField({
  style,
  name,
  label,
  ...props
}: Omit<TextFieldProps, 'name' | 'label'> & Partial<Pick<TextFieldProps, 'name' | 'label'>>) {
  return (
    <TextField
      autoCorrect={false}
      name={name ?? 'username'}
      label={label ?? 'Nazwa użytkownika'}
      style={[{ textTransform: 'lowercase' }, style]}
      {...props}
    />
  )
}

export default UsernameTextField
