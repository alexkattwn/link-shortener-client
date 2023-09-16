import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'

import App from './App.tsx'
import { store } from './store/store.ts'

import 'react-toastify/dist/ReactToastify.css'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
        <ToastContainer position='bottom-left' autoClose={2000} />
    </Provider>
)
