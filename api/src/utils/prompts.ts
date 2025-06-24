import type { ISimpleProduct } from 'src/models/receipt.model'

const ERROR_WARNING = `
  If you encounter an error, you should fill just the error field with the error message.
`

export function getScanImagePrompt() {
  return `
    From the image of an receipt attached, extract a list of the products purchased, along with their price, the amount for which the receipt was issued and the title of the operation should include the abbreviated name of the shop (without company information etc.).
    but with minus sign before it. Also remember to ignore the sum up price, and provide the price for single product. So if you see "0.152 * 36.9 5.61" you should provide 36.9 as the price for single product and 0.152 as the amount of the product.
    Do an exact extraction of the products on the receipt. Don't add anything.
    Your response should be in (json) format:
    {
        title: string
        sum: number
        products: [
            {
                name: string,
                price: number, // remember to get price for single product, not the sum
                count: number,
                discount: number // remember to check for discounts, and don't add them as a separate product, but include it here. (sometime under the product there is another line with discount, DON'T ADD IT AS ANOTHER PRODUCT, PUT THE NUMBER THERE)
            }
        ]
    }

    If provided image doesn't seem to be a receipt or sum of products doesn't equal to \`sum\`, you should return just "error".
    ${ERROR_WARNING}
`
}

export function getTitlePrompt(products: ISimpleProduct[]) {
  return `
    Generate a descriptive receipt name from product list.
    Receipt name should have a max of 28 characters and keep the language in which products are written.
    \`\`\`
    ${JSON.stringify(products)}
    \`\`\`
    ${ERROR_WARNING}
  `
}
