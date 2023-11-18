import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { Langs } from 'src/types/generic.types'
import { changeUserLang } from 'src/helpers/reducers/user/user.thunk'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'

const LanguageSelect = () => {
  const user = useAppSelector(selectUser)

  if (!user) {
    return null
  }

  const dispatch = useAppDispatch()

  const handleChange = (event: SelectChangeEvent<Langs>) => {
    const lang = event.target.value as Langs
    dispatch(changeUserLang({ lang }))
  }

  return (
    <FormControl sx={{ m: 2, width: 130 }}>
      <Select onChange={handleChange} value={user.lang}>
        {Object.values(Langs).map(lang => (
          <MenuItem key={lang} value={lang}>
            {lang}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default LanguageSelect
