import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
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

const ReceiptSkeleton = () => {
  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper>
            <List>
              {generateElements(
                <ListItem>
                  <ListItemButton disableTouchRipple>
                    <ListItemText>
                      <Stack direction='row' spacing={1} alignItems='flex-end'>
                        <Skeleton variant='text' width={150} />
                        <Skeleton variant='text' width={50} />
                      </Stack>
                    </ListItemText>

                    <ListItemIcon>
                      <Stack direction='row' alignItems='center' spacing={1}>
                        <Skeleton variant='circular' height={40} width={40} />
                        <Skeleton variant='text' width={30} />
                      </Stack>
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>,
                10
              )}
            </List>
          </Paper>
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
