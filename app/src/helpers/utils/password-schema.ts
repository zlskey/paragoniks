import * as yup from 'yup'

export const usernameSchema = yup.object().shape({
  username: yup
    .string()
    .lowercase()
    .required('Nazwa użytkownika jest wymagana')
    .min(3, 'Nazwa użytkownika musi mieć co najmniej 3 znaki')
    .max(32, 'Nazwa użytkownika może mieć maksymalnie 32 znaki'),
})

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Hasło jest wymagane')
    .min(8, 'Hasło musi mieć co najmniej 8 znaków')
    .max(32, 'Hasło może mieć maksymalnie 32 znaki')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/g,
      'Hasło musi zawierać co najmniej jedną wielką literę, jedną małą literę i jedną cyfrę'
    ),
  repeatPassword: yup
    .string()
    .required('Powtórzenie hasła jest wymagane')
    .oneOf([yup.ref('password'), ''], 'Hasła nie pasują do siebie'),
})

export const userSchema = usernameSchema.concat(passwordSchema)
