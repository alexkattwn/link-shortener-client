import { Link } from "react-router-dom"
import { FC } from "react"

import img from '../assets/404.jpg'
import { useMode } from "../hooks/useTheme"
import { HOME_ROUTE } from "../constants"

import styles from './error-page.module.scss'

const ErrorPage: FC = () => {

    const mode = useMode()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <div className={`${styles.error} ${darkModeClass}`}>
            <img src={img} alt="Not Found" className={styles.error__img} />
            <Link to={HOME_ROUTE} className={`${styles.error__btn}  ${darkModeClass}`}>
                Back
            </Link>
        </div>
    )
}

export default ErrorPage