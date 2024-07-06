import React from 'react'
import ReactDOM from 'react-dom/client'

import { Toaster } from './components/ui/toaster'
import App from './pages/app'
import './styles/globals.css'

const rootEl = document.getElementById('root')

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl)

  root.render(
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  )
}
