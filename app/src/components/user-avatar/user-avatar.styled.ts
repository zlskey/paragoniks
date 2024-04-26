import { Avatar, styled } from '@mui/material'

interface StyledAvatarProps {
  avatarColor: string
  size?: 'md' | 'lg'
  selected?: boolean
  clickable?: boolean
}

const shouldForwardProp = (prop: string) =>
  prop !== 'avatarColor' &&
  prop !== 'selected' &&
  prop !== 'clickable' &&
  prop !== 'size'

export const StyledAvatar = styled(Avatar, {
  shouldForwardProp,
})<StyledAvatarProps>`
  background-color: ${props => props.avatarColor};
  width: ${props => (props.size === 'lg' ? '50px' : '40px')};
  height: ${props => (props.size === 'lg' ? '50px' : '40px')};
  box-shadow: ${props => (props.selected ? props.theme.shadows[15] : 'none')};
  transform: ${props => (props.selected ? 'scale(1.15)' : 'none')};
  cursor: ${props => (props.clickable ? 'pointer' : 'default')};
`
