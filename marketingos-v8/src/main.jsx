import React from 'react'
import ReactDOM from 'react-dom/client'
import LegacyApp from './components/LegacyApp'
import './legacy/reference.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LegacyApp />
  </React.StrictMode>,
)
