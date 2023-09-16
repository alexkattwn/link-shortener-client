import { useEffect } from "react"

import { useMode, useTheme } from "../../../hooks/useTheme"

import styles from "./mode-toggler.module.scss"

const ModeToggler = () => {

    const { toggleTheme } = useTheme()
    const mode = useMode()

    const handleToggleMode = () => {
        toggleTheme()
        document.body.classList.toggle('dark_mode')
    }

    useEffect(() => {
        document.body.classList.add(mode === 'dark' ? 'dark_mode' : 'body')
    }, [mode])

    return (
        <div className={styles.theme}>
            <input
                className={styles.theme__input}
                type="checkbox"
                checked={mode === 'light'}
                onChange={handleToggleMode}
            />
        </div>
    )
}

export default ModeToggler