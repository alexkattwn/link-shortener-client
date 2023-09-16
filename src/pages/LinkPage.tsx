import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LinkService } from '../services/link.service'
import { NOT_FOUND_ROUTE } from '../constants'
import { useMode } from '../hooks/useTheme'

import styles from './link-page.module.scss'
import Loader from '../components/elements/Loader/Loader'

const LinkPage: FC = () => {

    const { link } = useParams()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const fetchLink = async () => {
        try {
            setIsLoading(true)
            const data = await LinkService.getLink(link)
            if (data) {
                await LinkService.increment({ count: data.count + 1 }, data.id)
                window.location.replace(data?.original_link)
            }
        } catch (error) {
            navigate(NOT_FOUND_ROUTE)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchLink()
    }, [])

    const mode = useMode()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <section className={`${styles.main} ${darkModeClass}`}>
            {isLoading && (
                <Loader />
            )}
        </section>
    )
}

export default LinkPage