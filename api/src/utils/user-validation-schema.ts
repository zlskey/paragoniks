import { ErrorObject } from 'src/middlewares/error.middleware'

import * as yup from 'yup'

export const usernameSchema = yup.object().shape({
  username: yup
    .string()
    .lowercase()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(32, 'Username must be at most 32 characters'),
})

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be at most 32 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/g,
      'Password must contain at least one uppercase letter, one lowercase letter and one number',
    ),
})

export const userValidationSchema = usernameSchema.concat(passwordSchema)

export async function validateAndThrow(schema: yup.ObjectSchema<any>, username: string, password: string) {
  try {
    await schema.validate({ username, password })
  }
  catch (error) {
    if (error instanceof yup.ValidationError) {
      const message = error.errors[0]

      throw new ErrorObject(message, 401)
    }

    throw new ErrorObject('Coś poszło nie tak', 500)
  }
}
