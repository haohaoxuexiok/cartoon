export interface IAccount {
  account: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  account:string
  password:string
  role:string,
  state:string,
  createAt:string
  updateAt:string
  token: string
}

export interface IDataType<T = any> {
  data: T
}
