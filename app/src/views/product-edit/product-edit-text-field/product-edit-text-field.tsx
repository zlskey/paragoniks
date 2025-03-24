import type { TextInputProps } from 'react-native'
import type { Product } from 'src/app/generic.types'
import Typography from '@components/typography'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import { colors, getPx } from 'src/app/styles'
import { usePreciseProductEditContext } from 'src/views/product-edit/product-edit.context'

interface ProductEditTextFieldProps extends TextInputProps {
  name: 'name' | 'price' | 'count' | 'discount'
  label: string
}

type PreciseEditProductEditTextFieldFormValues = Pick<
  Product,
  'name' | 'price' | 'count' | 'discount'
>

const errorInput = {
  borderColor: colors.red,
  borderWidth: 1,
}

function ProductEditTextField({
  name,
  label,
  ...props
}: ProductEditTextFieldProps) {
  const { product } = usePreciseProductEditContext()
  const form = useFormContext<PreciseEditProductEditTextFieldFormValues>()
  const [value, setValue] = useState(form.getValues(name).toString())

  useEffect(() => {
    if (props.keyboardType !== 'numeric') {
      form.setValue(name, value, { shouldValidate: true })
      return
    }

    const valueToNum = Number.parseFloat(Number.parseFloat(value).toFixed(2))

    if (Number.isNaN(valueToNum)) {
      return
    }

    form.setValue(name, valueToNum, { shouldValidate: true })
  }, [value])

  function onBlur() {
    if (props.keyboardType !== 'numeric') {
      return
    }

    const valueToNum = Number.parseFloat(Number.parseFloat(value).toFixed(2))

    if (Number.isNaN(valueToNum)) {
      setValue(product[name].toString())
      return
    }

    setValue(valueToNum.toString())
  }

  return (
    <View style={{ flex: 1 }}>
      <Typography variant="subtitle2">{label}</Typography>

      <TextInput
        value={value}
        onChangeText={setValue}
        onBlur={onBlur}
        style={{
          backgroundColor: colors.paper,
          color: colors.text,
          fontSize: getPx(2),
          padding: getPx(1),
          borderRadius: getPx(1),
          ...(form.formState.errors[name] ? errorInput : {}),
        }}
        {...props}
      />
    </View>
  )
}

export default ProductEditTextField
