import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SmoothScrolling from './components/smooth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScrolling />
    <App />
  </StrictMode>,
)
