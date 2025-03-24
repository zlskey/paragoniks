import type { Receipt } from 'src/app/generic.types'

interface Section {
  data: Receipt[]
  title: string
}

export function getReceiptsSplittedByMonth(receipts: Receipt[]) {
  return receipts
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .reduce((acc, receipt) => {
      const key = new Date(receipt.createdAt)
        .toLocaleDateString('pl-PL', {
          month: 'long',
        })
        .replace(/^\w/, c => c.toUpperCase())

      const section = acc.find(section => section.title === key)

      if (section) {
        section.data.push(receipt)
      }
      else {
        acc.push({
          title: key,
          data: [receipt],
        })
      }

      return acc
    }, [] as Section[])
}
