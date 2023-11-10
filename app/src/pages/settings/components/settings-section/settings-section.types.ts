import { PropsWithChildren } from 'react'

export interface SettingsSectionProps extends PropsWithChildren {
    title: string
    subtitle: string
    icon: React.ReactNode
}
