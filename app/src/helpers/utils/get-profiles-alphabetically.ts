import type { User } from '@paragoniks/shared'

interface Section<T extends User> {
  data: T[]
  title: string
}

export function getProfilesAlphabetically<T extends User>(profiles: T[]) {
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
