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
import { useEffect, useState } from 'react'

import { ContributorItemProps } from './contributor-item.types'
import ContributorItemSkeleton from './contributor-item.skeleton'
import { Profile } from 'src/types/generic.types'
import RemoveIcon from '@mui/icons-material/PersonRemoveOutlined'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { removeContributor } from 'src/helpers/reducers/receipt/receipt.thunk'
import { rsApi } from 'src/helpers/services/rs.service'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import useUserCutCalc from 'src/helpers/hooks/use-user-cut-calc'

const ContributorItem = ({ contributorId, receipt }: ContributorItemProps) => {
  const user = useAppSelector(selectUser)

  if (!user) return

  const dispatch = useAppDispatch()

  const userCut = useUserCutCalc(contributorId, receipt)

  const [hover, setHover] = useState(false)

  const [contributor, setContributor] = useState<Profile | null>(null)

  useEffect(() => {
    ;(async () => {
      const res = await rsApi.get<Profile>(`/user/profile/${contributorId}`)

      const profile = res.data

      setContributor(profile)
    })()
  }, [])

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

  if (!contributor) {
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
          <UserAvatar
            userId={contributor._id !== user._id ? contributor._id : undefined}
          />
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
