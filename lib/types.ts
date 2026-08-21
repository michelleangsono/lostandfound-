export interface User {
  id: number
  email: string
  fullname: string | null
  password: string | null
}

export interface Item {
  id: number
  name: string
  isclaim: boolean | null
  zone: string | null
  userid: number | null
}
