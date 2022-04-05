import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import CustomDivider from '../../../components/CustomDivider'
import {useAuthAxios} from '../../../api/api'
import { TokenContext } from '../../../context/context'
import { useNavigate } from 'react-router-dom'


function MonthlySale() {
    const navigate = useNavigate()
    const {setToken} = useContext(TokenContext)
    const authAxios = useAuthAxios();
    const [graphData, setGraphData] = useState([])

    async function getData(){
        try{
            const res =  await authAxios('/admin/stats/monthly/sell');
            const data = res.data.stats;
            console.log(data)
            const newData = data.map(item=>({
                month:`${item.month} ${item.year}`,
                total_sale:item.total_sale
            }))
            console.log(newData)
            setGraphData(newData)
        }catch(err){
            if(err?.response?.data?.message === 'Unauthenticated.'){
                navigate('/')
            }        }
    }
    useEffect(()=>{
        const sessionToken = sessionStorage.getItem('token');
        const sessionRole = sessionStorage.getItem('role');
        sessionToken && setToken({token:sessionToken,role:sessionRole})
        sessionToken && sessionStorage.getItem('token') && (authAxios.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`);
        getData()
    },[])

    return (
        <Grid container >
            <Grid xs={12} item>
                <Stack sx={{ my: 2 }} direction={{ sm: "row", xs: 'column' }} justifyContent="space-between">
                    <Typography variant='h3'>Monthly Sale</Typography>
                </Stack>
                <Box sx={{ mb: 2 }} >
                    <CustomDivider />
                </Box>
                <Grid container item >
                    <Grid sx={{mx:'auto'}} item={10}>
                        <LineChart width={600} height={300} data={graphData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="total_sale" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MonthlySale