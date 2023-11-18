import { ReactNode } from 'react'

export interface SettingsItemProps {
  title: ReactNode
  subtitle: ReactNode
  icon: ReactNode
  endComponent?: ReactNode
  onClick?: () => void
}
