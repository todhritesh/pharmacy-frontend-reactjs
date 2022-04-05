import { Grid } from '@mui/material'
import React,{useState,useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthAxios } from '../../api/api'
import DashboardCard from '../../components/DashboardCard'
import { TokenContext } from '../../context/context'

function PharmacistDashboard() {
    const navigate = useNavigate()
    const [isLoading , setIsLoading] = useState(true)
    const {setToken} = useContext(TokenContext)
    const authAxios = useAuthAxios();
    const [dashboardData , setDashboardData] = useState([])

    const getData = async () => {
        try{
            const res = await authAxios('/pharmacist/dashboard')
            const data = res.data.dashboard
            setDashboardData(data)
            setIsLoading(false)
        }catch(err){
            console.log(err.response.data.message)
            if(err?.response?.data?.message === 'Unauthenticated.'){
                navigate('/')
            }
        }
    }
    useEffect(()=>{
        const sessionToken = sessionStorage.getItem('token');
        const sessionRole = sessionStorage.getItem('role');
        sessionToken && setToken({token:sessionToken,role:sessionRole})
        sessionToken && sessionStorage.getItem('token') && (authAxios.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`);
        getData();
    },[])
  return (
    <Grid container spacing={2}>
        {
            isLoading ?
            (
                <>
                    <Grid xs={12} sm={4} item><DashboardCard count={""} isLoading={isLoading} title={""} /></Grid>
                    <Grid xs={12} sm={4} item><DashboardCard count={""} isLoading={isLoading} title={""} /></Grid>
                    <Grid xs={12} sm={4} item><DashboardCard count={""} isLoading={isLoading} title={""} /></Grid>
                </>
            )
            :
            (
                Object.keys(dashboardData).map((item,i)=>(
                    <Grid sx={{cursor:'pointer'}} onClick={()=>navigate(dashboardData[item]['to'])} key={i} xs={12} sm={4} item><DashboardCard count={dashboardData[item]['count']} title={item} /></Grid>
                ))
            )
        }
    </Grid>
  )
}

export default PharmacistDashboard