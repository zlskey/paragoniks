import Flex from '@components/flex'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'

function NoPcSupport() {
  return (
    <Wrapper>
      <Flex
        justifyContent="center"
        alignContent="center"
        direction="column"
        nativeFlex
        spacing={1}
      >
        <Typography variant="title">
          Niewspierane urządzenie
        </Typography>
        <Typography variant="subtitle2">
          Aplikacja wspierana tylko na urządzeniach mobilnych
        </Typography>
      </Flex>
    </Wrapper>
  )
}

export default NoPcSupport
