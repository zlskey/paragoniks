import { colors } from '@app/styles'
import Flex from '@components/flex'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'

interface AuthWrapperProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

function AuthWrapper({
  title,
  subtitle,
  children,
}: AuthWrapperProps) {
  return (
    <Wrapper>
      <Flex
        pl={3}
        pr={3}
        pb={3}
        nativeFlex
        spacing={2}
        direction="column"
        alignContent="stretch"
      >
        <Typography variant="display">{title}</Typography>

        {subtitle && (
          <Typography variant="subtitle2" styles={{ color: colors.placeholder }}>
            {subtitle}
          </Typography>
        )}

        {children}
      </Flex>
    </Wrapper>
  )
}

export default AuthWrapper
