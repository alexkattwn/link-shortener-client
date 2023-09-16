import { FC } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import LogoutSvg from "../../elements/LogoutSvg/LogoutSvg"
import { useAuth, useUser } from "../../../hooks/useAuth"
import { useAppDispatch } from "../../../store/hooks"
import { logout } from "../../../store/user/userSlice"
import { removeTokenFromLocalStorage } from "../../../helpers/localstorage.helper"
import LoginSvg from "../../elements/LoginSvg/LoginSvg"
import { usePopup } from "../../../hooks/usePopup"
import { useMediaQuery } from "../../../hooks/useMediaQuery"
import ModeToggler from "../../elements/ModeToggler/ModeToggler"
import { useMode } from "../../../hooks/useTheme"
import {
    AUTH_ROUTE,
    HOME_ROUTE,
    PROFILE_ROUTE
} from "../../../constants"

import styles from './header.module.scss'

const Header: FC = () => {
    const dispatch = useAppDispatch()

    const { toggleOpen, open, closePopup } = usePopup()

    const handlePopup = () => {
        if (open) return closePopup()
        return toggleOpen()
    }

    const isMedia950 = useMediaQuery(950)

    const isAuth = useAuth()
    const user = useUser()

    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success('You logged out')
        navigate(AUTH_ROUTE)
        closePopup()
    }

    const navigate = useNavigate()

    const mode = useMode()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <header className={`${styles.header} ${darkModeClass}`}>
            {isMedia950 && (
                <>
                    <button
                        onClick={handlePopup}
                        className={`${styles.burger_menu} ${open ? styles.open : ''}`}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <NavLink
                        to={HOME_ROUTE}
                        className={`${styles.header__text} ${darkModeClass}`}
                    >
                        <span className={styles.header__title}>
                            Link Shortener
                        </span>
                    </NavLink>
                </>
            )}
            <nav className={`${styles.header__nav} ${open ? styles.open : ''} ${darkModeClass}`}>
                {!isMedia950 && (
                    <NavLink
                        to={HOME_ROUTE}
                        className={`${styles.header__text} ${darkModeClass}`}
                        onClick={closePopup}
                    >
                        <span className={styles.header__title}>
                            Link Shortener
                        </span>
                    </NavLink>
                )}
                <ul className={styles.header__list}>
                    <li className={styles.header__list__item}>
                        <ModeToggler />
                    </li>
                    {isAuth ? (
                        <>
                            <li className={styles.header__list__item}>
                                <NavLink
                                    className={`${styles.header__text} ${darkModeClass}`}
                                    to={PROFILE_ROUTE}
                                    onClick={closePopup}
                                >
                                    {user?.username}
                                </NavLink>
                            </li>
                            <li className={styles.header__list__item}>
                                <span
                                    className={`${styles.header__list__item__svg} ${darkModeClass}`}
                                    onClick={logoutHandler}
                                >
                                    <LogoutSvg />
                                    <span>
                                        LogOut
                                    </span>
                                </span>
                            </li>
                        </>
                    ) : (
                        <li className={styles.header__list__item}>
                            <span
                                className={`${styles.header__list__item__svg} ${darkModeClass}`}
                                onClick={() => {
                                    navigate(AUTH_ROUTE)
                                    closePopup()
                                }}
                            >
                                <LoginSvg />
                                <span>
                                    LogIn
                                </span>
                            </span>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header