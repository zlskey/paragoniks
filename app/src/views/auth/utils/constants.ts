export const AUTH_MESSAGES = {
  WELCOME_BACK: (username: string) => `Witaj ponownie ${username} ❣️`,
  WELCOME_NEW_USER: (username: string) => `Witamy ${username}!`,
  USERNAME_REQUIRED: 'Nazwa użytkownika jest wymagana',
  MISSING_REQUIRED_DATA: 'Brakuje wymaganych danych',
  PASSWORD_MIN_LENGTH: 'Hasło musi mieć co najmniej 8 znaków',
} as const

export const AUTH_LABELS = {
  SIGN_IN_GOOGLE: 'Zaloguj się przez Google',
  SIGN_IN_APPLE: 'Zaloguj się przez Apple',
  CREATE_ACCOUNT: 'Utwórz konto',
  SIGN_IN: 'Zaloguj się',
  NEXT: 'Dalej',
  FORGOT_PASSWORD: 'Zapomniałeś hasła?',
  HAVE_ACCOUNT: 'Masz już konto?',
  USERNAME: 'Nazwa użytkownika',
  USERNAME_OR_EMAIL: 'Nazwa użytkownika lub email',
  EMAIL: 'Email',
  PASSWORD: 'Hasło',
  REPEAT_PASSWORD: 'Powtórz hasło',
  NEW_PASSWORD: 'Nowe hasło',
  REPEAT_NEW_PASSWORD: 'Powtórz nowe hasło',
  VERIFICATION_CODE: 'Kod',
  SET_PASSWORD: 'Ustaw hasło',
  RESEND_CODE: 'Wyślij ponownie',
  SKIP: 'Pomiń',
} as const

export const AUTH_TITLES = {
  MAIN: 'Zarządzaj wydatkami razem z przyjaciółmi łatwo i wygodnie.',
  LOGIN: 'Zaloguj się',
  LOGIN_SUBTITLE: 'Wpisz swoją nazwę użytkownika lub email powiązany z kontem, aby odzyskać dostęp do swojego konta.',
  SIGNUP: 'Utwórz konto',
  SIGNUP_PROFILE_SUBTITLE: 'Kliknij na avatar, aby wybrać swoje zdjęcie profilowe.',
  PASSWORD_RECOVERY: 'Odzyskaj hasło',
  PASSWORD_RECOVERY_SUBTITLE: 'Wpisz swoją nazwę użytkownika lub email powiązany z kontem, aby odzyskać dostęp do swojego konta.',
  CODE_SENT: 'Wysłaliśmy do Ciebie kod',
  CODE_SENT_SUBTITLE: 'Sprawdź swoją skrzynkę i wklej kod, aby odzyskać dostęp do swojego konta.',
  NEW_PASSWORD: 'Ustaw nowe hasło',
  NEW_PASSWORD_SUBTITLE: 'Wybierz nowe hasło dla swojego konta.',
} as const

export const DEFAULT_FORM_VALUES = {
  LOGIN: { usernameOrEmail: '' },
  LOGIN_PASSWORD: (usernameOrEmail: string) => ({ password: '', usernameOrEmail }),
  SIGNUP: { username: '' },
  SIGNUP_EMAIL: { email: null },
  SIGNUP_PASSWORD: { password: '', repeatPassword: '' },
  SIGNUP_PROFILE: { avatar: '' },
  PASSWORD_RECOVERY: { usernameOrEmail: '' },
  PASSWORD_RECOVERY_CODE: { code: '' },
  NEW_PASSWORD: { password: '', repeatPassword: '' },
} as const
