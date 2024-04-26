import { PropsWithChildren, ReactNode } from 'react'

export interface SettingsSectionProps extends PropsWithChildren {
  title: ReactNode
  subtitle: ReactNode
  icon: React.ReactNode
}
