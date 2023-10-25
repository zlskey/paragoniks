import { Fragment } from 'react'

const generateElements = (element: React.ReactNode, count: number) => {
  return Array.from({ length: count }, (_, index) => {
    return <Fragment key={index}>{element}</Fragment>
  })
}

export default generateElements
