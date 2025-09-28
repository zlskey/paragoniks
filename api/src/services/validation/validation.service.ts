import { userService } from 'src/services'

export async function checkIfUsernameIsTaken(username: string, excludeGoogleAccount = false) {
  return await userService.checkIfUsernameIsTaken(username, excludeGoogleAccount)
}

export async function checkIfEmailIsTaken(email: string, excludeGoogleAccount = false) {
  return await userService.checkIfEmailIsTaken(email, excludeGoogleAccount)
}

export async function checkIfUsernameOrEmailIsTaken(usernameOrEmail: string, excludeGoogleAccount = false) {
  const isEmail = usernameOrEmail.includes('@')
  return isEmail
    ? await userService.checkIfEmailIsTaken(usernameOrEmail, excludeGoogleAccount)
    : await userService.checkIfUsernameIsTaken(usernameOrEmail, excludeGoogleAccount)
}
