import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './pages/Layout'
import { TokenContext } from './context/context'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'



function App() {
  const [token, setToken] = useState({token:'',role:''})
  return (
    <BrowserRouter>
    <TokenContext.Provider value={{ token, setToken }}>
      <Layout/>
    </TokenContext.Provider>
    <ToastContainer  toastStyle={{ fontSize:"18px",fontWeight:'bold' }} />
    </BrowserRouter>
  )
}

export default App