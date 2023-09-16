import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { useAppDispatch } from "../store/hooks"
import { AuthService } from "../services/auth.service"
import { setTokenToLocalStorage } from "../helpers/localstorage.helper"
import { login } from "../store/user/userSlice"
import { useMode } from "../hooks/useTheme"
import { PROFILE_ROUTE } from "../constants"

import styles from './auth-page.module.scss'

const AuthPage: FC = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState<boolean>(false)

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.registration({ username, password })
            if (data) {
                toast.success('The account has been created')
                setIsLogin(!isLogin)
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.login({ username, password })
            if (data) {
                setTokenToLocalStorage('token', data.token)
                dispatch(login(data))
                toast.success('You logged in')
                navigate(PROFILE_ROUTE, { replace: true })
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    const mode = useMode()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <section className={`${styles.auth} ${darkModeClass}`}>
            <h1 className={styles.auth__title}>
                {isLogin ? 'Login' : 'Registration'}
            </h1>

            <form
                className={styles.auth__form}
                onSubmit={isLogin ? loginHandler : registrationHandler}
            >
                <input
                    type='text'
                    className={`${styles.auth__form__input} ${darkModeClass}`}
                    placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <input
                    type='password'
                    className={`${styles.auth__form__input} ${darkModeClass}`}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button className={`${styles.auth__form__btn} ${darkModeClass}`}>
                    Submit
                </button>
            </form>

            <div className={styles.auth__form__swap}>
                {
                    isLogin ? (
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className={`${styles.auth__form__swap__btn} ${darkModeClass}`}
                        >
                            You don't have an account?
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className={`${styles.auth__form__swap__btn} ${darkModeClass}`}
                        >
                            Already have an account?
                        </button>
                    )
                }
            </div>
            <div className="overlay" />
        </section>
    )
}

export default AuthPage