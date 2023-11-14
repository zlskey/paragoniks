import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { ContributorItemProps } from './contributor-item.types'
import ContributorItemSkeleton from './contributor-item.skeleton'
import RemoveIcon from '@mui/icons-material/PersonRemoveOutlined'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { removeContributor } from 'src/helpers/reducers/receipt/receipt.thunk'
import { selectSingleProfile } from 'src/helpers/reducers/profiles/profiles.reducer'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useState } from 'react'
import useUserCutCalc from 'src/helpers/hooks/use-user-cut-calc'

const ContributorItem = ({ contributorId, receipt }: ContributorItemProps) => {
  const user = useAppSelector(selectUser)
  const profile = useAppSelector(selectSingleProfile(contributorId))

  if (!user) return

  const dispatch = useAppDispatch()

  const userCut = useUserCutCalc(contributorId, receipt)

  const [hover, setHover] = useState(false)

  const handleRemoveContributor = () => {
    dispatch(
      removeContributor({
        contributorId,
        receiptId: receipt._id,
      })
    )
  }

  const handleMouseOver = () => setHover(true)
  const handleMouseOut = () => setHover(false)

  if (!profile) {
    return <ContributorItemSkeleton />
  }

  return (
    <ListItem>
      <ListItemAvatar onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {hover && contributorId !== user._id && user._id === receipt.owner ? (
          <Avatar>
            <IconButton onClick={handleRemoveContributor}>
              <RemoveIcon />
            </IconButton>
          </Avatar>
        ) : (
          <UserAvatar userId={profile._id} />
        )}
      </ListItemAvatar>

      <ListItemText>{profile.username}</ListItemText>

      <ListItemIcon>
        <Typography>{userCut}</Typography>
      </ListItemIcon>
    </ListItem>
  )
}

export default ContributorItem
