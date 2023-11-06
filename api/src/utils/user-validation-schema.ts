import * as yup from 'yup'

import { ErrorObject } from 'src/middlewares/error.middleware'

export const userValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(32, 'Username must be at most 32 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be at most 32 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter and one number'
    ),
})

export const validateAndThrow = async (username: string, password: string) => {
  try {
    await userValidationSchema.validate({ username, password })
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const message = error.errors[0]

      throw new ErrorObject(message, 401)
    }

    throw new ErrorObject('Something went wrong', 500)
  }
}
