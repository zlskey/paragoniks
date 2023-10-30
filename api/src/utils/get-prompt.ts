export const getPrompt = (receipt: string) => `
    From the receipt below, extract a list of the products purchased with their price, the amount for which the receipt was issued and the title of the operation should include the abbreviated name of the shop (without company information etc.) and the date of the operation.
    Your response should be in (json) format:
    {
        sum: number,
        title: string,
        items: [
            {
                name: string,
                value: number,
                count: number
            }
        ]
    }

    If provided text doesn't seem to be a receipt or sum of products doesn't equal to \`sum\`, you should return just "error" 

    receipt:
    \`\`\`
    ${receipt}
    \`\`\`
`
