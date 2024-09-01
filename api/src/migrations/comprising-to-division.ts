import Receipt from 'src/models/receipt.model'
;
(async () => {
  console.log('Migration: comprising-to-division started')

  const receipts = await Receipt.find()
  console.log('Receipts found:', receipts.length)

  for (const receipt of receipts) {
    receipt.products = receipt.products.map(product => {
      // @ts-ignore
      if ('comprising' in product === false) {
        return product
      }

      product.division = {}
      product.divisionType = 'amount'

      const fullPrice = product.price * product.count - product.discount

      // @ts-ignore
      const noOfContributors = product.comprising.length

      // @ts-ignore
      for (const userId of receipt.contributors.concat(receipt.owner)) {
        const userIdString = userId.toString()

        if (
          // @ts-ignore
          product.comprising.map(el => el.toString()).includes(userIdString)
        ) {
          product.division[userIdString] = fullPrice / noOfContributors
        } else {
          product.division[userIdString] = null
        }
      }

      // @ts-ignore
      const { comprising, ...updatedProduct } = product

      return updatedProduct
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

  console.log('Migration: comprising-to-division finished')
})()
