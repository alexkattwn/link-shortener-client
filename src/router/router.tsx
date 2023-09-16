import { createBrowserRouter } from "react-router-dom"
import { Layout } from "../components/layout/Layout"
import { ProtectedRoute } from "../components/modules/ProtectedRoute/ProtectedRoute"
import ErrorPage from "../pages/ErrorPage"
import HomePage from "../pages/HomePage"
import ProfilePage from "../pages/ProfilePage"
import AuthPage from "../pages/AuthPage"
import LinkPage from "../pages/LinkPage"
import {
    AUTH_ROUTE,
    HOME_ROUTE,
    LINK_ROUTE,
    NOT_FOUND_ROUTE,
    PROFILE_ROUTE
} from "../constants"

export const router = createBrowserRouter([
    {
        path: HOME_ROUTE,
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: PROFILE_ROUTE,
                element: <ProtectedRoute>
                    <ProfilePage />
                </ProtectedRoute>
            },
            {
                path: AUTH_ROUTE,
                element: <AuthPage />
            },
            {
                path: LINK_ROUTE,
                element: <LinkPage />
            }
        ]
    },
    {
        path: NOT_FOUND_ROUTE,
        element: <ErrorPage />
    }
])