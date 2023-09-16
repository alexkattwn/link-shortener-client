import { FC, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopBarProgress from "react-topbar-progress-indicator"

import Footer from '../modules/Footer/Footer'
import Header from '../modules/Header/Header'

const Layout: FC = () => {
    const [progress, setProgress] = useState(false)
    const [prevLoc, setPrevLoc] = useState("")
    const location = useLocation()

    useEffect(() => {
        setPrevLoc(location.pathname)
        setProgress(true)
        if (location.pathname === prevLoc) {
            setPrevLoc('')
        }
    }, [location])

    useEffect(() => {
        setProgress(false)
    }, [prevLoc])

    return (
        <>
            {progress && <TopBarProgress />}

            <Header />

            <Outlet />

            <Footer />
        </>
    )
}

export { Layout }