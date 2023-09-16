interface User {
    id: number
    username: string
    password: string
}

export interface ILink {
    id: number
    original_link: string
    short_link: string
    count: number
}

export interface ILinkUser extends ILink {
    user: User
}
