import type { Profile } from '@app/generic.types'

interface Section {
  data: Profile[]
  title: string
}

export function getProfilesAlphabetically(profiles: Profile[]) {
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
    }, [] as Section[])
}
