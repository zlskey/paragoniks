import AddContributorItem from './components/add-contributor-item'
import ContributorItem from './components/contributor-item/contributor-item'
import { List } from '@mui/material'
import { Receipt } from 'src/types/generic.types'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useAppSelector } from 'src/redux-hooks'

const ReceiptContributorsList = ({ receipt }: { receipt: Receipt }) => {
  const user = useAppSelector(selectUser)

  const contributors = receipt.contributors.concat([receipt.owner])

  return (
    <List>
      {contributors.map(contributorId => (
        <ContributorItem
          key={contributorId}
          receipt={receipt}
          contributorId={contributorId}
        />
      ))}

      {user?._id === receipt.owner && (
        <AddContributorItem contributorsList={contributors} />
      )}

      {/* <ContributorStatusButton /> */}
    </List>
  )
}

export default ReceiptContributorsList
