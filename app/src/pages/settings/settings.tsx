import { Paper, Stack, Typography } from '@mui/material'

import AccountIcon from '@mui/icons-material/PermIdentityOutlined'
import AvatarIcon from '@mui/icons-material/AccountCircleOutlined'
import ChangeAvatarModal from './components/change-avatar-modal/change-avatar-modal'
import ChangePasswordModal from './components/change-password-modal/change-password-modal'
import ChangeUsernameModal from './components/change-username-modal/change-username-modal'
import PasswordChangeIcon from '@mui/icons-material/PasswordOutlined'
import SettingsItem from './components/settings-item'
import SettingsSection from './components/settings-section'
import StylesSectionIcon from '@mui/icons-material/FormatPaintOutlined'
import ThemeChangeIcon from '@mui/icons-material/DarkModeOutlined'
import ThemeSwitch from './components/theme-switch'
import UsernameChangeIcon from '@mui/icons-material/PermContactCalendar'
import Wrapper from 'src/components/wrapper'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useAppSelector } from 'src/redux-hooks'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
  const user = useAppSelector(selectUser)

  const navigate = useNavigate()

  if (!user) return null

  const openModal = (id: string) => () => {
    navigate(`#${id}`)
  }

  return (
    <Wrapper>
      <Paper>
        <Typography p={2} variant='h4'>
          Settings
        </Typography>
      </Paper>

      <Stack spacing={2} mt={4}>
        <SettingsSection
          title='Account'
          subtitle='Manage your account details'
          icon={<AccountIcon />}
        >
          <SettingsItem
            title='Username'
            subtitle='Change your username'
            icon={<UsernameChangeIcon />}
            onClick={openModal('username')}
          />

          <SettingsItem
            title='Password'
            subtitle='Change your password'
            icon={<PasswordChangeIcon />}
            onClick={openModal('password')}
          />
        </SettingsSection>

        <SettingsSection
          title='Style'
          subtitle='Adjust your style settings'
          icon={<StylesSectionIcon />}
        >
          <SettingsItem
            title='Dark Theme'
            subtitle='Disable or enable dark theme'
            icon={<ThemeChangeIcon />}
            endComponent={<ThemeSwitch />}
          />

          <SettingsItem
            title='Avatar'
            subtitle='Pick your avatar color'
            icon={<AvatarIcon />}
            onClick={openModal('avatar')}
          />
        </SettingsSection>
      </Stack>

      <ChangeUsernameModal />
      <ChangePasswordModal />
      <ChangeAvatarModal />
    </Wrapper>
  )
}

export default Settings
