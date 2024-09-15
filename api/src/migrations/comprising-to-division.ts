import Receipt from 'src/models/receipt.model'
import { getCalculatedTotalsForReceipt } from 'src/utils/calculators'
;
(async () => {
  console.log('Migration: comprising-to-division started')

  const receipts = await Receipt.find()
  console.log('Receipts found:', receipts.length)

  for (const receipt of receipts) {
    if (Array.isArray(receipt.contributors) === false) {
      return
    }

    const contributors = receipt.contributors as unknown as string[]
    const updatedContributors = Object.fromEntries(
      contributors
        .concat([receipt.owner.toString()])
        .map(contributor => [contributor, 0])
    )

    await Receipt.findByIdAndUpdate(
      receipt._id,
      {
        $set: getCalculatedTotalsForReceipt({
          contributors: updatedContributors,
          products: receipt.products.map(product => {
            // @ts-ignore
            if ('comprising' in product) {
              // @ts-ignore
              const { comprising, ...rest } = product
              return rest
            }
            return product
          }),
        }),
      },
      {
        new: true,
      }
    )
  }

  console.log('Migration: comprising-to-division finished')
})()
