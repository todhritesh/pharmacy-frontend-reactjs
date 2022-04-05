import React, { useContext, useEffect} from 'react'
import { Login, Sidebar,  AdminDashboard , RoutesConteiner} from './index'
import { TokenContext } from '../context/context'
import { useAuthAxios } from '../api/api'


function Layout() {
  const {setToken} = useContext(TokenContext) 
  const authAxios = useAuthAxios()
  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    const sessionRole = sessionStorage.getItem('role');
    sessionToken && setToken({token:sessionToken,role:sessionRole})
    sessionToken && sessionStorage.getItem('token') && (authAxios.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`);
  }, [])
  return (
    <RoutesConteiner/>
  )
}

export default Layout