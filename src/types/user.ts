export interface IUser {
    id: number
    username: string
    token: string
}

export interface IUserData {
    username: string
    password: string
}

export interface IResponseUserData {
    user: IResponseUser
    token: string
}

export interface IResponseUser {
    email: string
    id: number
}