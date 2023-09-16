import { FC } from 'react'

import img from '../../../assets/makima.jpg'
import { useAuth } from '../../../hooks/useAuth'
import { useMode } from '../../../hooks/useTheme'

import styles from './protected-route.module.scss'

interface Props {
    children: JSX.Element
}

export const ProtectedRoute: FC<Props> = ({ children }) => {

    const isAuth = useAuth()

    const mode = useMode()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <>
            {isAuth ? (
                children
            ) : (
                <div className={`${styles.main} ${darkModeClass}`}>
                    <h2 className={`${styles.main__text} ${darkModeClass}`}>
                        To view this page you must be logged in
                    </h2>
                    <img
                        className={styles.main__img}
                        src={img}
                        alt='img'
                    />
                </div>
            )}
        </>
    )
}