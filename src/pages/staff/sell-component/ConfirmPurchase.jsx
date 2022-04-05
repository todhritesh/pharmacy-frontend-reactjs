import { Button, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TableBody, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import CustomTableCell from '../../../components/CustomTableCell'
import CustomTableContainer from '../../../components/CustomTableContainer'
import {useAuthAxios} from '../../../api/api'
import { toast } from 'react-toastify'

function ConfirmPurchase({setCountTotal,itemData,setItemData,customer,setCustomer,open,setOpen,countTotal}) {
    const authAxios = useAuthAxios()
    async function handlePurchase(){
        try{
            const items = itemData.map(item=>{
                return {
                    id:item.id,
                    qty:item.qty
                }
            })
            const formData = {
                customer_details:customer,
                items,
            }
    
            console.log(formData)
            const res = await authAxios.post('/staff/sell',formData)
            toast.success("Order completed successfully")
            setItemData([]);
            setCustomer('');
            setOpen(false);
            setCountTotal(0)
        }catch(err){
            console.log(err?.response.data)
        }
    }
    
    return (
        <Grid container>
            <Grid item md={10}>
            <Dialog  fullScreen open={open} onClose={()=>setOpen(false)} >
            <DialogActions>
                <Button sx={{mr:'auto'}} onClick={()=>setOpen(false)} variant="contained" color="secondary">Back</Button>
            </DialogActions>
            <DialogTitle>
                Confirm Purchase
            </DialogTitle>
            <DialogContent>
                <CustomTableContainer>
                    <TableHead sx={{ position: 'relative' }} >
                        <TableRow sx={{ position: 'sticky' }}>
                            <CustomTableCell size="18px" weight={'bold'} item="Sl no." />
                            <CustomTableCell size="18px" weight={'bold'} item="Name" />
                            <CustomTableCell size="18px" weight={'bold'} item="Image" />
                            <CustomTableCell size="18px" weight={'bold'} item="Mfd date" />
                            <CustomTableCell size="18px" weight={'bold'} item="Brand" />
                            <CustomTableCell size="18px" weight={'bold'} item="Remaining qty" />
                            <CustomTableCell size="18px" weight={'bold'} item="Expiry date" />
                            <CustomTableCell size="18px" weight={'bold'} item="Price per peice" />
                            <CustomTableCell size="18px" weight={'bold'} item="gst" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {


                            itemData.map((item, i) => (
                                <TableRow key={i}>
                                    <CustomTableCell item={i + 1} />
                                    <CustomTableCell item={item.name} />
                                    <CustomTableCell item={
                                        <CardMedia
                                            image={item.image_link}
                                            sx={{
                                                display: 'inline-block',
                                                objectFit: 'contained',
                                                width: '100px',
                                                height: '100px'
                                            }}
                                            component={'img'}
                                        />
                                    } />
                                    <CustomTableCell item={item.custom_mfd} />
                                    <CustomTableCell item={item.brand} />
                                    <CustomTableCell item={item.remaining_qty} />
                                    <CustomTableCell item={item.custom_exp} />
                                    <CustomTableCell item={`₹ ${item.sp}`} />
                                    <CustomTableCell item={`${item.gst}%`} />
                                </TableRow>
                            ))

                        }
                    </TableBody>
                <DialogActions>
                    <Typography variant="h4" component="span">Total : ₹<Typography variant="h5" sx={{mr:5}} component="span">{countTotal}</Typography></Typography>
                    <Button onClick={handlePurchase} variant="contained" size="large" color="secondary">Confirm purchase</Button>
                </DialogActions>
                </CustomTableContainer>
            </DialogContent>
        </Dialog>
            </Grid>
        </Grid>
    )
}

export default ConfirmPurchase