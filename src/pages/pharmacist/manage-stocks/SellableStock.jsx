import { Button, CardMedia, Dialog, Grid, IconButton, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import CustomTableContainer from '../../../components/CustomTableContainer';
import AddIcon from '@mui/icons-material/Add';
import { TokenContext } from '../../../context/context';
import { useAuthAxios } from '../../../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CustomDivider from '../../../components/CustomDivider';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import CustomTableCell from '../../../components/CustomTableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import StockDialog from './AddStock';
import EditStockDialog from './EditStockDialog';
import get_curr_date from '../../../helpers/get_curr_date'


const useStyles = makeStyles({
    headerFont: {
        fontSize: '18px',
        fontWeight: 'bold'
    }
})


function SellableStock() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const authAxios = useAuthAxios()
    const [stockData, setStockData] = useState([])
    const { setToken } = useContext(TokenContext)
    const classes = useStyles()


    async function getData() {
        try {
            const res = await authAxios('/pharmacist/manage-stocks/get_expired_or_sellable_stocks/sellable');
            const data = res.data.stocks
            setStockData(data);
            setIsLoading(false)
        } catch (err) {
            if (err?.response?.data?.message === 'Unauthenticated.') {
                toast.error("You are unauthenticated , please login")
                navigate("/")
            }
        }
    }
    useEffect(() => {
        const sessionToken = sessionStorage.getItem('token');
        const sessionRole = sessionStorage.getItem('role');
        sessionToken && setToken({ token: sessionToken, role: sessionRole })
        sessionToken && sessionStorage.getItem('token') && (authAxios.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`);
        getData()
    }, [])


    return (
        <Grid container >
            <Grid xs={12} item>
                <Stack sx={{ my: 2 }} spacing={{sm:2}} direction={{ md: "row", sm: 'column' }} alignItems="center" >
                    <Box>
                        <Typography variant='h3' component="span" >Manage Stock | 
                            <Typography variant='h4' component={'span'}>{` Sellable`}</Typography>
                        </Typography>
                    </Box>
                </Stack>
                <Box sx={{ mb: 2 }} >
                    <CustomDivider />
                </Box>
                <CustomTableContainer>
                    <TableHead sx={{position:'relative'}} >
                        <TableRow sx={{position:'sticky'}}>
                            <CustomTableCell size="18px" weight={'bold'} item="Sl no."/>
                            <CustomTableCell size="18px" weight={'bold'} item="Name" />
                            <CustomTableCell size="18px" weight={'bold'} item="Image" />
                            <CustomTableCell size="18px" weight={'bold'} item="Added By" />
                            <CustomTableCell size="18px" weight={'bold'} item="Brand" />
                            <CustomTableCell size="18px" weight={'bold'} item="Category" />
                            <CustomTableCell size="18px" weight={'bold'} item="Total qty" />
                            <CustomTableCell size="18px" weight={'bold'} item="Remaining qty" />
                            <CustomTableCell size="18px" weight={'bold'} item="Expiry date" />
                            <CustomTableCell size="18px" weight={'bold'} item="Price per peice" />
                            <CustomTableCell size="18px" weight={'bold'} item="Total cost" />
                            <CustomTableCell size="18px" weight={'bold'} item="selling price" />
                            <CustomTableCell size="18px" weight={'bold'} item="gst" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading ?
                                (
                                    <>
                                        <TableRow >
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100px" height="100px" variant='rectangular' animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100px" height="100px" variant='rectangular' animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100px" height="100px" variant='rectangular' animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                        </TableRow>
                                    </>
                                )

                                :
                                (
                                    stockData.map((item, i) => (
                                        <TableRow key={i}>
                                            <CustomTableCell item={i+1} />
                                            <CustomTableCell item={item.name} />
                                            <CustomTableCell item={
                                                <CardMedia
                                                image={item.image_link}
                                                sx={{
                                                    display:'inline-block',
                                                    objectFit:'contained',
                                                    width:'100px',
                                                    height:'100px'
                                                }}
                                                component={'img'}
                                                />
                                            } />
                                            <CustomTableCell item={item.added_by['name']} />
                                            <CustomTableCell item={item.brand} />
                                            <CustomTableCell item={item.category} />
                                            <CustomTableCell item={item.total_qty} />
                                            <CustomTableCell item={item.remaining_qty} />
                                            <CustomTableCell item={item.custom_exp} />
                                            <CustomTableCell item={`₹ ${item.price_per_peice}`} />
                                            <CustomTableCell item={`₹ ${item.total_cost}`} />
                                            <CustomTableCell item={`₹ ${item.sp}`} />
                                            <CustomTableCell item={`${item.gst}%`} />
                                        </TableRow>
                                    ))
                                )
                        }
                    </TableBody>
                </CustomTableContainer>
            </Grid>
        </Grid>
    )
}

export default SellableStock


