export interface IAuth {
    user: IUser
    expires: number
  }
  
  export interface IUser {
    name: string
    email: string
    image: string
  }