import {
  Avatar,
  AvatarGroup,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import EditIcon from '@mui/icons-material/EditOutlined'
import { ProductItemProps } from './product-item.types'
import { Receipt } from 'src/types/generic.types'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { getPrice } from 'src/helpers/utils/get-price'
import { toggleProductComprising } from 'src/helpers/services/endpoints/receipt/receipt.service'
import { useMemo } from 'react'
import { useReceiptContext } from 'src/helpers/contexts/receipt/receipt.context'
import { useUser } from 'src/helpers/contexts/current-user/current-user.context'

const optimisticlyToggleComprising = (
  receipt: Receipt,
  productId: string,
  userId: string
) => {
  return {
    ...receipt,
    products: receipt.products.map(product => {
      if (product._id === productId) {
        const comprising = product.comprising.find(
          comprising => comprising === userId
        )

        if (comprising) {
          return {
            ...product,
            comprising: product.comprising.filter(
              comprisingId => comprisingId !== userId
            ),
          }
        }

        return {
          ...product,
          comprising: [...product.comprising, userId],
        }
      }

      return product
    }),
  }
}

const ProductItem = ({ productId, onEdit }: ProductItemProps) => {
  const user = useUser()
  const { receipt, contributors } = useReceiptContext()

  const product = receipt.products.find(product => product._id === productId)

  if (!product) {
    return null
  }

  const userCut = useMemo(() => {
    const isComprising = product.comprising.includes(user._id)
    const cut = (product.price * product.count) / product.comprising.length

    const userCutRaw = isComprising ? cut : 0

    return getPrice(userCutRaw)
  }, [product.comprising])

  const isOwner = receipt.owner === user._id

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['receipt', { receiptId: receipt._id }],
    mutationFn: toggleProductComprising,
    onMutate: async () => {
      const previousValue = queryClient.getQueryData<Receipt>([
        'receipt',
        { receiptId: receipt._id },
      ])

      const updatedReceipt = optimisticlyToggleComprising(
        receipt,
        product._id,
        user._id
      )

      queryClient.setQueryData(
        ['receipt', { receiptId: receipt._id }],
        updatedReceipt
      )

      return { previousValue }
    },
    onError: (err, newData, context) => {
      if (!context) {
        return
      }

      if (err || newData) {
        // something
      }

      queryClient.setQueryData(
        ['receipt', { receiptId: receipt._id }],
        context.previousValue
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['receipt', { receiptId: receipt._id }],
      })
    },
  })

  return (
    <ListItem
      secondaryAction={
        isOwner && (
          <IconButton onClick={() => onEdit(product)}>
            <EditIcon />
          </IconButton>
        )
      }
    >
      <ListItemButton
        onClick={() =>
          mutate({ receiptId: receipt._id, productId: product._id })
        }
      >
        <ListItemText
          primary={product.name}
          secondary={`x ${product.count}`}
          primaryTypographyProps={{ display: 'inline', mr: 1 }}
          secondaryTypographyProps={{ display: 'inline' }}
        />

        <ListItemIcon>
          <Stack direction='row' alignItems='center' spacing={1}>
            <AvatarGroup>
              <Avatar sx={{ visibility: 'hidden' }} />

              {product.comprising.map(friendId => {
                const profile = contributors.find(
                  contributor => contributor._id === friendId
                )

                if (!profile) {
                  return null
                }

                return <UserAvatar key={friendId} profile={profile} />
              })}
            </AvatarGroup>

            <Typography>{userCut}</Typography>
          </Stack>
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  )
}

export default ProductItem
