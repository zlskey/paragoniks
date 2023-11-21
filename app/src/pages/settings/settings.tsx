import { Paper, Stack, Typography } from '@mui/material'

import AccountIcon from '@mui/icons-material/PermIdentityOutlined'
import AvatarIcon from '@mui/icons-material/AccountCircleOutlined'
import ChangeAvatarModal from './components/change-avatar-modal/change-avatar-modal'
import ChangePasswordModal from './components/change-password-modal/change-password-modal'
import ChangeUsernameModal from './components/change-username-modal/change-username-modal'
import LanguageChangeIcon from '@mui/icons-material/TranslateOutlined'
import LanguageSelect from './components/language-select/language-select'
import PasswordChangeIcon from '@mui/icons-material/PasswordOutlined'
import SettingsItem from './components/settings-item'
import SettingsSection from './components/settings-section'
import StylesSectionIcon from '@mui/icons-material/FormatPaintOutlined'
import ThemeChangeIcon from '@mui/icons-material/DarkModeOutlined'
import ThemeSwitch from './components/theme-switch'
import { Trans } from '@lingui/macro'
import UsernameChangeIcon from '@mui/icons-material/PermContactCalendar'
import Wrapper from 'src/components/wrapper'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
  const navigate = useNavigate()

  const openModal = (id: string) => () => {
    navigate(`#${id}`)
  }

  return (
    <Wrapper>
      <Paper>
        <Typography p={2} variant='h4'>
          <Trans>Settings</Trans>
        </Typography>
      </Paper>

      <Stack spacing={2} mt={4}>
        <SettingsSection
          title={<Trans>Account</Trans>}
          subtitle={<Trans>Manage your account details</Trans>}
          icon={<AccountIcon />}
        >
          <SettingsItem
            title={<Trans>Username</Trans>}
            subtitle={<Trans>Change your username</Trans>}
            icon={<UsernameChangeIcon />}
            onClick={openModal('username')}
          />

          <SettingsItem
            title={<Trans>Password</Trans>}
            subtitle={<Trans>Change your password</Trans>}
            icon={<PasswordChangeIcon />}
            onClick={openModal('password')}
          />

          <SettingsItem
            title={<Trans>Language</Trans>}
            subtitle={<Trans>Change language</Trans>}
            icon={<LanguageChangeIcon />}
            endComponent={<LanguageSelect />}
          />
        </SettingsSection>

        <SettingsSection
          title={<Trans>Style</Trans>}
          subtitle={<Trans>Adjust your style settings</Trans>}
          icon={<StylesSectionIcon />}
        >
          <SettingsItem
            title={<Trans>Dark Theme</Trans>}
            subtitle={<Trans>Disable or enable dark theme</Trans>}
            icon={<ThemeChangeIcon />}
            endComponent={<ThemeSwitch />}
          />

          <SettingsItem
            title={<Trans>Avatar</Trans>}
            subtitle={<Trans>Pick your avatar color</Trans>}
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
