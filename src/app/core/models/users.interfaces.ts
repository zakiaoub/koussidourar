export interface User {
  email: string | null,
  password: string | null,
}

export interface UserPasword {
  email: string | null
}

export interface UserPaswordReset {
  email: string | null,
  password: string | null,
  confirmPassword: string | null,
}

export interface GoogleUser {
  code: string | null
}

export interface GoogleUserToken {
  token: string | null
}


