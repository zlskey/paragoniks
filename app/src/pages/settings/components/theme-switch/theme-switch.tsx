import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Switch } from '@mui/material'
import { toggleTheme } from 'src/helpers/api/endpoints/user/user.api'
import { useUser } from 'src/helpers/contexts/current-user/current-user.context'

const ThemeSwitch = () => {
  const user = useUser()

  const theme = user.theme

  const queryClient = useQueryClient()

  const { mutate: handleThemeChange } = useMutation({
    mutationKey: ['user', 'theme'],
    mutationFn: toggleTheme,
    onSuccess: user => {
      queryClient.setQueryData(['user', 'whoami'], user)
    },
  })

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={() => handleThemeChange({})}
      color='primary'
    />
  )
}

export default ThemeSwitch
