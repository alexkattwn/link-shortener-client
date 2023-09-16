import { FC } from 'react'

import MailSvg from '../../elements/MailSvg/MailSvg'

import styles from './footer.module.scss'

const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__title}>
                <span>
                    © «Link Shortener» 2023
                </span>
            </div>
            <div className={styles.footer__contacts}>
                <a
                    href="mailto:ShortLinker@gmail.com"
                    className={styles.footer__contacts__link}
                >
                    <MailSvg />
                    <span>kattwn777@gmail.com</span>
                </a>
            </div>
            <div className={styles.footer__social}>
                <ul className={styles.footer__social__block}>
                    <li className={styles.footer__social__block__item}>
                        <a
                            href="#"
                            className={styles.footer__social__block__item_vk}
                        />
                    </li>
                    <li className={styles.footer__social__block__item}>
                        <a
                            href="#"
                            className={styles.footer__social__block__item_fb}
                        />
                    </li>
                    <li className={styles.footer__social__block__item}>
                        <a
                            href="#"
                            className={styles.footer__social__block__item_inst}
                        />
                    </li>
                    <li className={styles.footer__social__block__item}>
                        <a
                            href="#"
                            className={styles.footer__social__block__item_ytb}
                        />
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer