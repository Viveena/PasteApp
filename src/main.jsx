import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {store} from './store.js'
import {Provider} from 'react-redux'
import {Toaster } from 'react-hot-toast';
import './index.css'
import App from './App.jsx'
import viteLogo from '/vite.svg';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    <Toaster/>
    </Provider>
    
  </StrictMode>,
)
