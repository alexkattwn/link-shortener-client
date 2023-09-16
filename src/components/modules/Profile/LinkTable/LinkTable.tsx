import { FC, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import axios from 'axios'

import { ILinkUser } from '../../../../types/link'
import { useMode } from '../../../../hooks/useTheme'
import { getTokenFromLocalStorage } from '../../../../helpers/localstorage.helper'

import styles from './link-table.module.scss'

interface ILinkTable {
    limit: number
    refresh: boolean
    setRefresh: (bool: boolean) => void
}

const LinkTable: FC<ILinkTable> = ({ limit = 3, refresh, setRefresh }) => {

    const [data, setData] = useState<ILinkUser[] | null>([])

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)

    const fetchTransactions = async (page: number) => {
        const instance = axios.create({
            withCredentials: true,
            baseURL: import.meta.env.VITE_APP_API_URL,
            headers: {
                Authorization: `Bearer ${getTokenFromLocalStorage() || ''}`,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        })
        const response = await instance.get(`/link?page=${page}&limit=${limit}`)
        setData(response.data.rows)
        setTotalPages(Math.ceil(response.data.count / limit))
        setRefresh(false)
    }

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1)
    }

    useEffect(() => {
        fetchTransactions(currentPage)
    }, [currentPage, refresh])

    const mode = useMode()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <>
            {data?.length ? (
                <>
                    <ReactPaginate
                        className={styles.paginate}
                        activeClassName={`${styles.paginate__active} ${darkModeClass}`}
                        pageLinkClassName={`${styles.paginate__page_link} ${darkModeClass}`}
                        previousClassName={styles.paginate__previous}
                        nextClassName={styles.paginate__next}
                        disabledClassName={styles.paginate__disabled}
                        disabledLinkClassName={styles.paginate__disabled_link}
                        pageCount={totalPages}
                        pageRangeDisplayed={1}
                        marginPagesDisplayed={1}
                        onPageChange={handlePageChange}
                    />
                    <div className={styles.main}>
                        <table className={`${styles.main__table} ${darkModeClass}`}>
                            <thead>
                                <tr>
                                    <td
                                        className={`${styles.main__table__header} ${styles.main__table__center} ${darkModeClass}`}
                                    >
                                        №
                                    </td>
                                    <td className={`${styles.main__table__header} ${darkModeClass}`}>
                                        Original link
                                    </td>
                                    <td className={`${styles.main__table__header} ${darkModeClass}`}>
                                        Short link
                                    </td>
                                    <td
                                        className={`${styles.main__table__header} ${styles.main__table__center} ${darkModeClass}`}
                                    >
                                        Count
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((link, index) => (
                                    <tr key={index} className={darkModeClass}>
                                        <td className={`${styles.main__table__center} ${darkModeClass}`}>
                                            {index + 1}
                                        </td>
                                        <td className={styles.main__table__td_link}>
                                            <a
                                                href={link.original_link}
                                                target='_blank'
                                                className={`${styles.main__table__link} ${darkModeClass}`}
                                            >
                                                {link.original_link}
                                            </a>
                                        </td>
                                        <td className={styles.main__table__td_link}>
                                            <a
                                                href={link.short_link}
                                                target='_blank'
                                                className={`${styles.main__table__link} ${darkModeClass}`}
                                            >
                                                {`${import.meta.env.VITE_APP_CLIENT_URL}/${link.short_link}`}
                                            </a>
                                        </td>
                                        <td className={`${styles.main__table__center} ${darkModeClass}`}>
                                            {link.count}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <h3 className={styles.empty}>
                    There are no created links yet...
                </h3>
            )}
        </>
    )
}

export default LinkTable