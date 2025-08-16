import type { MD3Colors } from 'react-native-paper/lib/typescript/types'
import { StyleSheet, TextInput } from 'react-native'
import { useTheme } from 'react-native-paper'
import { getPx } from '../../app/styles'

type Colors = keyof Omit<MD3Colors, 'elevation'>

function getStyles(colors: MD3Colors, background?: Colors) {
  return StyleSheet.create({
    searchInput: {
      backgroundColor: colors[background || 'surface'],
      borderRadius: getPx(10),
      paddingTop: getPx(0.5),
      paddingBottom: getPx(0.5),
      paddingLeft: getPx(2),
      paddingRight: getPx(2),
      color: 'white',
    },
  })
}

interface SearchBarProps {
  background?: Colors
  onSearch?: (query: string) => void
  query?: string
}

function SearchBar({ onSearch, background, query }: SearchBarProps) {
  const { colors } = useTheme()
  const styles = getStyles(colors, background)

  return (
    <TextInput
      value={query}
      onChangeText={onSearch}
      placeholder="Szukaj"
      style={styles.searchInput}
      placeholderTextColor={colors.onBackground}
    />
  )
}

export default SearchBar
