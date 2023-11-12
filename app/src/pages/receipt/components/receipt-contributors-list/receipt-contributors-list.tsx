import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import AddContributorItem from './components/add-contributor-item'
import ContributorItem from './components/contributor-item/contributor-item'
import { List } from '@mui/material'
import { Receipt } from 'src/types/generic.types'
import { getAllFriendships } from 'src/helpers/reducers/friends/friends.thunk'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useEffect } from 'react'

const ReceiptContributorsList = ({ receipt }: { receipt: Receipt }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    dispatch(getAllFriendships({}))
  }, [])

  return (
    <List>
      {receipt.contributors.concat([receipt.owner]).map(contributorId => (
        <ContributorItem
          key={contributorId}
          receipt={receipt}
          contributorId={contributorId}
        />
      ))}

      {user?._id === receipt.owner && (
        <AddContributorItem
          contributorsList={[...receipt.contributors, receipt.owner]}
        />
      )}

      {/* <ContributorStatusButton /> */}
    </List>
  )
}

export default ReceiptContributorsList
