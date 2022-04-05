import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CustomDivider from '../../components/CustomDivider'
import ConfirmPurchase from './sell-component/ConfirmPurchase'
import SellForm from './sell-component/SellForm'
import ShowCase from './sell-component/ShowCase'

function Sell() {
const [itemData, setItemData] = useState([])
const [open,setOpen] = useState(false)
const [countTotal,setCountTotal] = useState(0)
const [customer, setCustomer] = useState('');

  return (
    <Grid container >
    <Grid xs={12} item>
        <Stack sx={{ my: 2 }} spacing={{sm:2}} direction={{ md: "row", sm: 'column' }} alignItems="center" >
            <Box>
                <Typography variant='h3' component="span" >Sell Section</Typography>
            </Box>
        </Stack>
        <Box sx={{ mb: 2 }} >
            <CustomDivider />
        </Box>
        <Grid container item>
          <Grid item md={5}>
            <SellForm setCustomer={setCustomer} countTotal={countTotal} setCountTotal={setCountTotal} itemData={itemData} setItemData={setItemData} setOpen={setOpen} />
          </Grid>
          <Grid item md={7}>
            <ShowCase itemData={itemData} setItemData={setItemData} />
          </Grid>
        </Grid>
    </Grid>
    <ConfirmPurchase setCountTotal={setCountTotal} setCustomer={setCustomer} customer={customer} countTotal={countTotal} open={open} setOpen={setOpen} itemData={itemData} setItemData={setItemData} />
</Grid>
  )
}

export default Sell