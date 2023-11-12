import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { Switch } from '@mui/material'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { toggleTheme } from 'src/helpers/reducers/user/user.thunk'

const ThemeSwitch = () => {
  const user = useAppSelector(selectUser)

  const dispatch = useAppDispatch()

  const theme = user?.theme || 'dark'

  const handleThemeChange = () => {
    dispatch(toggleTheme({}))
  }

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={handleThemeChange}
      color='primary'
    />
  )
}

export default ThemeSwitch
