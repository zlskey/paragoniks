import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Wrapper from 'src/components/wrapper'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const Home = () => {
  const theme = useTheme()

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Wrapper>
      <Grid
        container
        spacing={2}
        direction={isLargeScreen ? undefined : 'column-reverse'}
      >
        <Grid item xs={12} md={8}>
          <Paper>
            <Box p={2}>
              <List>
                <ListItem>
                  <Typography variant='h5'>Your receipts</Typography>
                </ListItem>

                <ListItem>
                  <ListItemButton>
                    <ListItemText>Some receipt</ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper>
            <Stack p={2} gap={1}>
              <Typography variant='h5'>Add new receipt</Typography>

              <Button
                component='label'
                variant='contained'
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <VisuallyHiddenInput type='file' />
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

export default Home
