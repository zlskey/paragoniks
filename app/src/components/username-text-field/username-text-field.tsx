import type { TextFieldProps } from '@components/text-field/text-field'
import TextField from '@components/text-field'

function UsernameTextField({
  name,
  label,
  ...props
}: Omit<TextFieldProps, 'name' | 'label'> & Partial<Pick<TextFieldProps, 'name' | 'label'>>) {
  return (
    <TextField
      autoCorrect={false}
      name={name ?? 'username'}
      label={label ?? 'Nazwa użytkownika'}
      formatValue={value => value.toLowerCase()}
      {...props}
    />
  )
}

export default UsernameTextField
