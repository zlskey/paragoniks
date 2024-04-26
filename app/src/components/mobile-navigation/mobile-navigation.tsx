import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { Trans } from '@lingui/macro'
import UserAvatar from '../user-avatar/user-avatar'
import styled from 'styled-components'
import { useUser } from 'src/helpers/contexts/current-user/current-user.context'

enum Paths {
  Receipts = '/',
  Friends = '/friends',
  Profile = '/profile',
  Stats = '/stats',
  Settings = '/settings',
}

const MobileNavigationContainer = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
`

const MobileNavigation = () => {
  const user = useUser()

  const navigate = useNavigate()

  const activePath = useLocation().pathname

  const navigateTo = (path: string) => () => {
    navigate(path)
  }

  return (
    <MobileNavigationContainer>
      <BottomNavigationAction
        icon={<ReceiptLongOutlinedIcon />}
        label={<Trans>Receipts</Trans>}
        value='receipts'
        onClick={navigateTo('/')}
        showLabel={activePath === Paths.Receipts}
      />

      <BottomNavigationAction
        icon={<GroupOutlinedIcon />}
        label={<Trans>Friends</Trans>}
        value='friends'
        onClick={navigateTo('/friends')}
        showLabel={activePath === Paths.Friends}
      />

      <BottomNavigationAction
        icon={<UserAvatar profile={user} />}
        value='profile'
        label={<Trans>Profile</Trans>}
        onClick={navigateTo('/profile')}
        showLabel={activePath === Paths.Profile}
      />

      <BottomNavigationAction
        icon={<BarChartOutlinedIcon />}
        label={<Trans>Stats</Trans>}
        value='stats'
        onClick={navigateTo('/stats')}
        showLabel={activePath === Paths.Stats}
      />

      <BottomNavigationAction
        icon={<SettingsOutlinedIcon />}
        label={<Trans>Settings</Trans>}
        value='settings'
        onClick={navigateTo('/settings')}
        showLabel={activePath === Paths.Settings}
      />
    </MobileNavigationContainer>
  )
}

export default MobileNavigation
