import AddContributorItem from './components/add-contributor-item'
import ContributorItem from './components/contributor-item/contributor-item'
import { List } from '@mui/material'
import { useReceiptContext } from 'src/helpers/contexts/receipt/receipt.context'
import { useUser } from 'src/helpers/contexts/current-user/current-user.context'

const ReceiptContributorsList = () => {
  const user = useUser()

  const { contributors, receipt } = useReceiptContext()

  return (
    <List>
      {contributors.map(contributor => (
        <ContributorItem key={contributor._id} contributor={contributor} />
      ))}

      {user._id === receipt.owner && <AddContributorItem />}

      {/* <ContributorStatusButton /> */}
    </List>
  )
}

export default ReceiptContributorsList
