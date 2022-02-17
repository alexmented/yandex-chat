export interface IChatProps {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: IUserProps,
        time: string,
        content: string
    }
}

export interface IUserProps {
    first_name: string,
    second_name: string,
    avatar: string,
    email: string,
    login: string,
    phone: string,
    id: number
}
