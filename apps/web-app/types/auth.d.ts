declare module '#auth-utils' {
  interface User {
    id: string
    name: string | null
    surname: string | null
    avatarUrl: string | null
  }
}

export {}
