import type { Division, DivisionType } from 'src/app/generic.types'
import { getUniqueArray } from './array'

export function isNull(value: any): value is null {
  return value === null
}

export function parseFloatWithTwoDecimals(number: number): number {
  return Number.parseFloat(number.toFixed(2))
}

export function getValueOrNull(value: any) {
  if (value === null) {
    return null
  }

  if (value === undefined) {
    return null
  }

  if (Number.isNaN(value)) {
    return 0
  }

  return parseFloatWithTwoDecimals(value) as number
}

export function getValidDivision(maybeDivision: any): Division {
  if (typeof maybeDivision !== 'object') {
    return {}
  }

  return Object.fromEntries(
    Object.entries(maybeDivision).map(([key, value]) => {
      return [key, getValueOrNull(value)]
    }),
  )
}

export function splitNumberEqually(numberToSplit: number, partsCount: number) {
  const evenPart = parseFloatWithTwoDecimals(numberToSplit / partsCount)
  const resultArray = Array.from({ length: partsCount }, (_, d) => {
    const currentPartCount = partsCount - 1
    if (d < currentPartCount) {
      return evenPart
    }
    return parseFloatWithTwoDecimals(
      numberToSplit - evenPart * currentPartCount,
    )
  })
  return resultArray
}

interface GetEvenDivisionProps {
  divisionType: DivisionType
  division: Division
  numberToSplit: number
  userToToggle?: string
}

export function getEvenDivision({
  divisionType,
  division,
  numberToSplit,
  userToToggle,
}: GetEvenDivisionProps): Division {
  const mockDivision = getValidDivision({ ...division })

  if (userToToggle) {
    const userToToggleDivision = getValidDivision(division)[userToToggle]
    mockDivision[userToToggle] = isNull(userToToggleDivision) ? 1 : null
  }

  const total = Object.values(mockDivision).filter(el => !isNull(el)).length
  const users = Object.keys(mockDivision)

  switch (divisionType) {
    case 'shares':
      return Object.fromEntries(
        users.map(user => [user, mockDivision[user] ? 1 : null]),
      )

    case 'amount':
    case 'percentage': {
      const evenDivision = splitNumberEqually(numberToSplit, total)
      return Object.fromEntries(
        users.map((user) => {
          if (isNull(mockDivision[user])) {
            return [user, null]
          }

          const newValue = evenDivision.pop()!

          if (newValue === undefined) {
            throw new Error('Even division failed')
          }

          return [user, newValue]
        }),
      )
    }
  }
}

function getNonNullUsersIds(division: Division) {
  return Object.entries(division)
    .filter(([_, val]) => !isNull(val))
    .map(([userId]) => userId)
}

function getIgnoreUsers(divisionUpdateStack: string[], editedId: string) {
  return getUniqueArray([...divisionUpdateStack, editedId])
}

/**
 * @param divisionDirtyFields - dirty fields of division
 * @param divisionType - type of division @see DivisionType
 * @param division - division of users @see Division
 * @param newValue - new value of division for @param userId
 * @param userId - user that division will be changed
 * @param price - total price of product
 */
interface GetNewDivisionProps {
  divisionUpdateStack?: string[]
  divisionType: DivisionType
  division: Division
  newValue: number
  userId: string
  total: number
}

export function getNewDivision({
  divisionUpdateStack = [],
  divisionType,
  division,
  newValue,
  userId,
  total,
}: GetNewDivisionProps) {
  const divisionWithNewValue = getValidDivision({
    ...division,
    [userId]: newValue ?? 0,
  })

  if (divisionType === 'shares') {
    return divisionWithNewValue
  }

  const nonNullUsers = getNonNullUsersIds(divisionWithNewValue)
  const ignoreUsers = getIgnoreUsers(divisionUpdateStack, userId)
  const divisionToUpdate = Object.fromEntries(
    Object.entries(divisionWithNewValue).filter(
      ([id]) => nonNullUsers.includes(id) && !ignoreUsers.includes(id),
    ),
  )

  const ignoreUsersSum = ignoreUsers.reduce(
    (acc, id) => acc + (divisionWithNewValue[id] ?? 0),
    0,
  )
  const numberToSplit = total - ignoreUsersSum

  if (numberToSplit < 0) {
    return division
  }

  const newDivision: Division = {
    ...divisionWithNewValue,
    ...getEvenDivision({
      division: divisionToUpdate,
      numberToSplit,
      divisionType,
    }),
  }

  return newDivision
}
