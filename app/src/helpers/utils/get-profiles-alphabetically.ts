import type { Profile } from '@types'

interface Section<T extends Profile> {
  data: T[]
  title: string
}

export function getProfilesAlphabetically<T extends Profile>(profiles: T[]) {
  return profiles
    .sort((a, b) => a.username.localeCompare(b.username))
    .reduce((acc, profile) => {
      const firstLetter = profile.username[0].toUpperCase()

      const section = acc.find(({ title }) => title === firstLetter)

      if (section) {
        section.data.push(profile)
      }
      else {
        acc.push({
          title: firstLetter,
          data: [profile],
        })
      }

      return acc
    }, [] as Section<T>[])
}
