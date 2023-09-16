import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import themeSlice from './theme/themeSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch