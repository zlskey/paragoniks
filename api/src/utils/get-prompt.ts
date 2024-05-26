export function getPrompt() {
  return `
    From the image of an receipt attached, extract a list of the products purchased, along with their price, the amount for which the receipt was issued and the title of the operation should include the abbreviated name of the shop (without company information etc.).
    Your response should be in (json) format:

    If the shop name is "Lidl" you can assume, that all discounts regarding the product are listed below the particular product or just after it. It will usually look like the price
    but with minus sign before it. Also remember to ignore the sum up price, and provide the price for single product. So if you see "0.152 * 36.9 5.61" you should provide 36.9 as the price for single product and 0.152 as the amount of the product.

    {
        sum: number,
        title: string,
        products: [
            {
                name: string,
                price: number, // remember to get price for single product, not the sum
                count: number,
                discount: number
            }
        ]
    }

    If provided image doesn't seem to be a receipt or sum of products doesn't equal to \`sum\`, you should return just "error" 
`
}
