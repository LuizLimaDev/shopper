import Home from 'pages/Home/Home'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { UpdateFileProvider } from './context/updateFileContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UpdateFileProvider>
      <Home />
    </UpdateFileProvider>
  </React.StrictMode>,
)
