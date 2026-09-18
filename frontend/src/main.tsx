import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/styles.css'
import './assets/css/modern.css'
import './assets/css/dimension.css'
import './assets/css/modernist.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
