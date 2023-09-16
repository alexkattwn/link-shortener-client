import axios from "axios"
import { ILink } from "../types/link"
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper"

const instance = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage() || ''}`,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
})

export const LinkService = {
    async getLink(link: string | undefined): Promise<ILink | undefined> {
        const { data } = await instance.get<ILink>(`link/${link}`)
        return data
    },

    async increment(obj: { count: number }, id: number): Promise<{ msg: string } | undefined> {
        const { data } = await instance.patch<{ msg: string }>(`link/${id}`, obj)
        return data
    }
}