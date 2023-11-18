import { PropsWithChildren, ReactNode } from 'react'

export interface SettingsModalProps extends PropsWithChildren {
  id: string
  title: ReactNode
}
