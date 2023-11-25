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
      'Password must contain at least one uppercase letter, one lowercase letter and one number'
    ),
  repeatPassword: yup
    .string()
    .required('Repeat password is required')
    .oneOf([yup.ref('password'), ''], 'Passwords do not match'),
})

export const userSchema = usernameSchema.concat(passwordSchema)
