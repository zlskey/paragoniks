export const getPrompt = (receipt: string) => `
    From the receipt below, extract a list of the products purchased with their price, the amount for which the receipt was issued and the title of the operation should include the abbreviated name of the shop (without company information etc.) and the date of the operation.
    Sometimes there are discounts for some products in a receipt. It is usually written under the product line. Try to include this value in 'discount' property.
    Since receipt is ridden from an image of variety of resolutions, name of the products won't always make sense. If you spot a typo in the \`name\` property, try to rewrite it as you understand current product. 
    Your response should be in (json) format:
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

    If provided text doesn't seem to be a receipt or sum of products doesn't equal to \`sum\`, you should return just "error" 

    receipt:
    \`\`\`
    ${receipt}
    \`\`\`
`
