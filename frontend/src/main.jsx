import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import TimeAgo from 'javascript-time-ago'
import App from './App'
import en from 'javascript-time-ago/locale/en.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

TimeAgo.addDefaultLocale(en)
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
