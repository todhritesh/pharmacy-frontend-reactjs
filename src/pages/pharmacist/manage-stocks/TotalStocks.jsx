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


function TotalStock() {
    const [dataStatus,setDataStatus] = useState('Total')
    const [tempData,setTempData] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const authAxios = useAuthAxios()
    const [stockData, setStockData] = useState([])
    const { setToken } = useContext(TokenContext)
    const [openStockDialog, setOpenStockDialog] = useState(false)
    const [editId ,setEditId] = useState('')
    const [openEditStockDialog, setOpenEditStockDialog] = useState(false)
    const classes = useStyles()


    async function getData() {
        try {
            const res = await authAxios('/pharmacist/manage-stocks/');
            const data = res.data.stocks
            setTempData(data)
            setStockData(data);
            setIsLoading(false)
        } catch (err) {
            if (err?.response?.data?.message === 'Unauthenticated.') {
                toast.error("You are unauthenticated , please login")
                navigate("/")
            }
        }
    }
    // console.log(stockData)
    useEffect(() => {
        const sessionToken = sessionStorage.getItem('token');
        const sessionRole = sessionStorage.getItem('role');
        sessionToken && setToken({ token: sessionToken, role: sessionRole })
        sessionToken && sessionStorage.getItem('token') && (authAxios.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`);
        getData()
    }, [])

    async function handleDelete(id){
        try{
            const res = await authAxios.delete(`/pharmacist/manage-stocks/${id}`);
            toast.success("Item deleted successfully")
            setStockData(stockData.filter(item=>item.id!=id));
        }catch(err){
            if (err?.response?.data?.message === 'Unauthenticated.') {
                toast.error("You are unauthenticated , please login")
                navigate("/")
            }
        }
    }

    function handleEditForm(id){
        setEditId(id)
        setOpenEditStockDialog(true)
    }

    function filterExpiredStock(){
        const curr_date = get_curr_date()
        setStockData(tempData.filter(item=>item.exp<=curr_date));
        setDataStatus("Expired")
    }

    function filterSellableStock(){
        const curr_date = get_curr_date()
        setStockData(tempData.filter(item=>item.exp>curr_date));
        setDataStatus("Sellable")
    }

    function getTotalStock(){
        const curr_date = get_curr_date()
        setStockData(tempData);
        setDataStatus("Total")
    }

    return (
        <Grid container >
            <Grid xs={12} item>
                <Stack sx={{ my: 2 }} spacing={{xs:2}} direction={{ md: "row", sm: 'column' }} alignItems="center" justifyContent="space-between">
                    <Box>
                        <Typography variant='h3' component="span" >Manage Stock | 
                            <Typography variant='h4' component={'span'}>{` ${dataStatus}`}</Typography>
                        </Typography>
                    <Box>
                        <Button sx={{ whiteSpace: "nowrap" }} onClick={() => setOpenStockDialog(true)} endIcon={<AddIcon />} variant="contained" color="secondary" >Add Stock</Button>
                    </Box>
                    </Box>
                </Stack>
                <Stack sx={{ my: 2 }} spacing={{sm:2}} direction={{ md: "row", sm: 'column' }} alignItems="center" >
                    
                    {/* <Box> */}
                        <Button onClick={getTotalStock}  variant="contained" color="secondary">Total Stocks</Button>
                        <Button onClick={filterExpiredStock} sx={{ml:2}} variant="contained" color="secondary">Expired Stocks</Button>
                        <Button onClick={filterSellableStock}  sx={{ml:2}} variant="contained" color="secondary">Sellable Stocks</Button>
                    {/* </Box> */}
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
                            <CustomTableCell size="18px" weight={'bold'} item="Edit" />
                            <CustomTableCell size="18px" weight={'bold'} item="Delete" />
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
                                            <CustomTableCell item={
                                                <IconButton onClick={() => handleEditForm(item.id)} variant="contained" color="secondary" ><EditIcon /></IconButton>
                                            } />
                                            <CustomTableCell item={
                                                <IconButton onClick={() => handleDelete(item.id)} variant="contained" color="secondary" ><DeleteIcon /></IconButton>
                                            } />
                                        </TableRow>
                                    ))
                                )
                        }
                    </TableBody>
                </CustomTableContainer>
            </Grid>
            <StockDialog
                setStockData={setStockData}
                stockData={stockData}
                setOpenStockDialog={setOpenStockDialog}
                openStockDialog={openStockDialog}
             />
            <EditStockDialog
                setStockData={setStockData}
                stockData={stockData}
                setOpenEditStockDialog={setOpenEditStockDialog}
                openEditStockDialog={openEditStockDialog}
                editId={editId}
                setEditId={setEditId}
             />
        </Grid>
    )
}

export default TotalStock


