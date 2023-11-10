export interface SettingsItemProps {
    title: string
    subtitle: string
    icon: React.ReactNode
    endComponent?: React.ReactNode
    onClick?: () => void
}