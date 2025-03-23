import { StyleSheet, TextInput } from 'react-native'
import { colors, getPx } from '../../app/styles'

import React from 'react'

type Colors = keyof typeof colors

const getStyles = (background?: Colors) =>
  StyleSheet.create({
    searchInput: {
      backgroundColor: colors[background || 'paper'],
      borderRadius: getPx(10),
      paddingHorizontal: getPx(2),
      paddingVertical: getPx(0.5),
      color: 'white',
    },
  })

interface SearchBarProps {
  background?: Colors
  onSearch?: (query: string) => void
  query?: string
}

function SearchBar({ onSearch, background, query }: SearchBarProps) {
  const styles = getStyles(background)

  return (
    <TextInput
      value={query}
      onChangeText={onSearch}
      placeholder='Szukaj'
      style={styles.searchInput}
      placeholderTextColor={colors.text}
    />
  )
}

export default SearchBar
