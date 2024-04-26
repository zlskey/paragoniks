import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'

import { ContributorItemProps } from './contributor-item.types'
import RemoveIcon from '@mui/icons-material/PersonRemoveOutlined'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { useReceiptContext } from 'src/helpers/contexts/receipt/receipt.context'
import useRemoveContributor from './use-remove-contributor'
import { useState } from 'react'
import { useUser } from 'src/helpers/contexts/current-user/current-user.context'
import useUserCutCalc from 'src/helpers/hooks/use-user-cut-calc'

const ContributorItem = ({ contributor }: ContributorItemProps) => {
  const user = useUser()

  const { receipt } = useReceiptContext()

  const userCut = useUserCutCalc(contributor._id, receipt)

  const [hover, setHover] = useState(false)

  const handleRemoveContributor = useRemoveContributor({
    contributorId: contributor._id,
  })

  const handleMouseOver = () => setHover(true)
  const handleMouseOut = () => setHover(false)

  return (
    <ListItem>
      <ListItemAvatar onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {hover && contributor._id !== user._id && user._id === receipt.owner ? (
          <Avatar>
            <IconButton onClick={handleRemoveContributor}>
              <RemoveIcon />
            </IconButton>
          </Avatar>
        ) : (
          <UserAvatar profile={contributor} />
        )}
      </ListItemAvatar>

      <ListItemText>{contributor.username}</ListItemText>

      <ListItemIcon>
        <Typography>{userCut}</Typography>
      </ListItemIcon>
    </ListItem>
  )
}

export default ContributorItem
