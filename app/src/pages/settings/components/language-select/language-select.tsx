import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Locale } from 'src/helpers/i18n/i18n.types'
import { changeUserLang } from 'src/helpers/api/endpoints/user/user.api'
import { locales } from 'src/helpers/i18n/i18n.data'
import { useUser } from 'src/helpers/contexts/current-user/current-user.context'

const LanguageSelect = () => {
  const user = useUser()

  const queryClient = useQueryClient()

  const { mutate: changeLanguage } = useMutation({
    mutationKey: ['user', 'lang'],
    mutationFn: changeUserLang,
    onSuccess: user => {
      queryClient.setQueryData(['user', 'whoami'], user)
    },
  })

  const handleChange = (event: SelectChangeEvent<Locale>) => {
    const lang = event.target.value as Locale

    changeLanguage({ lang })
  }

  return (
    <FormControl sx={{ m: 2, width: 130 }}>
      <Select onChange={handleChange} value={user.lang}>
        {locales.map(lang => (
          <MenuItem key={lang} value={lang}>
            {lang}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default LanguageSelect
