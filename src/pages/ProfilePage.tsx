import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import LinkTable from '../components/modules/Profile/LinkTable/LinkTable'
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper'
import { useMode } from '../hooks/useTheme'
import { ILinkUser } from '../types/link'

import styles from './profile-page.module.scss'

const ProfilePage: FC = () => {

    const [link, setLink] = useState<string>('')
    const [refresh, setRefresh] = useState<boolean>(false)

    const createLink = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            if (!link) {
                return toast.error('The field is empty')
            }
            const instance = axios.create({
                withCredentials: true,
                baseURL: import.meta.env.VITE_APP_API_URL,
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage() || ''}`,
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                }
            })
            const { data } = await instance.post<ILinkUser>('link', { original_link: link })
            if (data) {
                setLink('')
                setRefresh(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const mode = useMode()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <section className={`${styles.profile} ${darkModeClass}`}>
            <form
                className={styles.profile__group}
                onSubmit={createLink}
            >
                <input
                    type="text"
                    className={`${styles.profile__group__input} ${darkModeClass}`}
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder='Enter the link you want to shorten...'
                />
                <button
                    className={`${styles.profile__group__btn} ${darkModeClass}`}
                    type="submit"
                >
                    Shorten
                </button>
            </form>
            <LinkTable limit={5} refresh={refresh} setRefresh={setRefresh} />
            <div className="overlay" />
        </section>
    )
}

export default ProfilePage