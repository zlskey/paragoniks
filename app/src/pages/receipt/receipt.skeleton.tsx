import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  SkeletonProps,
  Stack,
  Typography,
} from '@mui/material'

import { Trans } from '@lingui/macro'
import Wrapper from 'src/components/wrapper'
import generateElements from 'src/helpers/utils/generate-elements'
import useScreenSize from 'src/helpers/hooks/use-screen-size'

const ReceiptSkeleton = () => {
  const { isDesktop } = useScreenSize()

  return (
    <Wrapper>
      <Grid
        container
        spacing={2}
        direction={isDesktop ? 'row' : 'column-reverse'}
      >
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            {generateElements(
              <Paper>
                <Stack p={2} direction='row' justifyContent='space-between'>
                  <Stack spacing={1}>
                    <Typography>
                      <AppSkeleton width={200} />
                    </Typography>

                    <Typography variant='body2'>
                      <AppSkeleton width={130} />
                    </Typography>
                  </Stack>

                  <Stack direction='row' alignItems='center' spacing={1}>
                    <AppSkeleton width={30} />
                  </Stack>
                </Stack>
              </Paper>,
              10
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Paper>
              <Stack p={1}>
                <Typography variant='h5'>
                  <AppSkeleton width={200} sx={{ p: 1 }} />
                </Typography>
              </Stack>
            </Paper>

            <Paper>
              <Grid container p={2} spacing={1}>
                <Grid item>
                  <Typography textAlign='left' variant='h5'>
                    <AppSkeleton width={100} />
                  </Typography>

                  <Typography color='GrayText' textAlign='left' variant='h6'>
                    <Trans>
                      <AppSkeleton width={140} />
                    </Trans>
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant='h5'>
                    <AppSkeleton width={45} />
                  </Typography>
                  <Typography color='GrayText' variant='h6'>
                    <AppSkeleton width={35} />
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper>
              <List>
                {generateElements(
                  <ListItem>
                    <ListItemAvatar>
                      <AppSkeleton variant='circular' height={40} width={40} />
                    </ListItemAvatar>

                    <ListItemText>
                      <ListItemText primary={<AppSkeleton width={100} />} />
                    </ListItemText>

                    <ListItemIcon>
                      <AppSkeleton width={30} />
                    </ListItemIcon>
                  </ListItem>,
                  3
                )}
              </List>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

const AppSkeleton = (props: SkeletonProps) => {
  return <Skeleton animation='wave' {...props} />
}

export default ReceiptSkeleton
