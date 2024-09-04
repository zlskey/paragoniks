import Receipt from 'src/models/receipt.model'
;
(async () => {
  console.log('Migration: division-amount-to-shares started')

  const receipts = await Receipt.find()
  console.log('Receipts found:', receipts.length)

  for (const receipt of receipts) {
    receipt.products = receipt.products.map(product => {
      if (product.divisionType === 'shares') {
        return product
      }

      product.divisionType = 'shares'

      for (const _ of receipt.contributors.concat(receipt.owner)) {
        const newDivision = {}

        for (const [userId, amount] of Object.entries(product.division)) {
          if (amount === null) {
            newDivision[userId] = null
          } else {
            newDivision[userId] = 1
          }
        }

        product.division = newDivision
      }

      return product
    })

    await Receipt.findByIdAndUpdate(
      receipt._id,
      {
        $set: {
          products: receipt.products,
        },
      },
      {
        new: true,
      }
    )
  }

  console.log('Migration: division-amount-to-shares finished')
})()
