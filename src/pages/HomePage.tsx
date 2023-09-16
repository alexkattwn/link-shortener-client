import { useMode } from '../hooks/useTheme'

import imgFirst from '../assets/mmm.jpg'
import imgSecond from '../assets/power.jpg'
import { useMediaQuery } from '../hooks/useMediaQuery'

import styles from './home-page.module.scss'

const HomePage = () => {

    const mode = useMode()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const isMedia520 = useMediaQuery(520)

    return (
        <section className={`${styles.home} ${darkModeClass}`}>
            {isMedia520 ? (
                <img src={imgSecond} alt="Home" className={styles.home__img} />
            ) : (
                <img src={imgFirst} alt="Home" className={styles.home__img} />
            )}
            <div className="overlay" />
        </section>
    )
}

export default HomePage