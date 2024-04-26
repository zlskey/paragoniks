import { useState, useEffect } from 'react'

type UseRandomizedValues = (
  min: number,
  max: number,
  intervalTime?: number
) => number

const useRandomizedValues: UseRandomizedValues = (
  min,
  max,
  intervalTime = 1500
) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const handleRandomWidth = () => setValue(getRandomNumber())

    handleRandomWidth()

    const interval = setInterval(handleRandomWidth, intervalTime)

    return () => clearInterval(interval)
  }, [])

  const getRandomNumber = () =>
    Math.floor(Math.random() * (max - min + 1)) + min

  return value
}

export default useRandomizedValues
