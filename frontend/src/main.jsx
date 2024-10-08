import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserContextProvider from './context/UserContext.jsx'
import {BrowserRouter as Router} from "react-router-dom"
import {Toaster} from "react-hot-toast"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <Router>
    <App />
      </Router>
      <Toaster gutter={3000} />
    </UserContextProvider>
  </React.StrictMode>,
)
