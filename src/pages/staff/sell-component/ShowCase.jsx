import { CardMedia, Grid,  IconButton,  Skeleton, Stack, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import CustomTableContainer from '../../../components/CustomTableContainer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomDivider from '../../../components/CustomDivider';
import { Box } from '@mui/system';
import CustomTableCell from '../../../components/CustomTableCell';
import { toast } from 'react-toastify';

function ShowCase({itemData , setItemData}) {

  function handleMinusItem(index){
    if(itemData[index]['qty']===1){
      const updatedItem = itemData.filter((item,i)=>index!==i)
      setItemData(updatedItem)
      return ;
    }
    const updatedItem =  itemData.map((item,i)=>{
      if(i===index){
        item.qty=item.qty-1
      }
      return item; 
    })
    setItemData(updatedItem);
  }

  function handleDeleteItem(index){
      const updatedItem = itemData.filter((item,i)=>index!==i)
      setItemData(updatedItem)
      toast.success('Item removed')
      return ;
  }

  function handleAddItem(index){
    if(itemData[index]['qty']==itemData[index]['remaining_qty']){
      toast.error("Quantity limit exceeded")
      return ;
    }
    const updatedItem =  itemData.map((item,i)=>{
      if(i===index){
        item.qty=Number(item.qty)+1
      }
      return item; 
    })
    setItemData(updatedItem);
  }

  return (
    <Grid container >
      <Grid sx={{mx:'auto'}} xs={11} item>
        <Stack sx={{ my: 2 }} spacing={{ sm: 2 }} direction={{ md: "row", sm: 'column' }} alignItems="center" >
          <Box>
            <Typography variant='h3' component="span" >Item Cart</Typography>
          </Box>
        </Stack>
        <Box sx={{ mb: 2 }} >
          <CustomDivider />
        </Box>
        <CustomTableContainer>
          <TableHead sx={{ position: 'relative' }} >
            <TableRow sx={{ position: 'sticky' }}>
              <CustomTableCell size="18px" weight={'bold'} item="#Sn" />
              <CustomTableCell size="18px" weight={'bold'} item="Name" />
              <CustomTableCell size="18px" weight={'bold'} item="Brand" />
              <CustomTableCell size="18px" weight={'bold'} item="qty" />
              <CustomTableCell size="18px" weight={'bold'} item="PPP" />
              <CustomTableCell size="18px" weight={'bold'} item="Exp date" />
              <CustomTableCell size="18px" weight={'bold'} item="Action" />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              itemData.map((item, i) => (
                <TableRow key={i}>
                  <CustomTableCell item={i + 1} />
                  <CustomTableCell item={item.name} />
                  <CustomTableCell item={item.brand} />
                  <CustomTableCell item={item.qty} />
                  <CustomTableCell item={`₹ ${item.sp}`} />
                  <CustomTableCell item={`₹ ${item.custom_exp}`} />
                  <CustomTableCell item={
                    <>
                      <IconButton onClick={()=>handleMinusItem(i)} color="error" ><RemoveIcon fontSize="small" /></IconButton>
                      <IconButton onClick={()=>handleAddItem(i)}  color="success" ><AddIcon fontSize="small" /></IconButton>
                      <IconButton onClick={()=>handleDeleteItem(i)} color="error" ><DeleteIcon fontSize="small" /></IconButton>
                    </>
                  } />
                </TableRow>
              ))

            }
          </TableBody>
        </CustomTableContainer>
      </Grid>
    </Grid>
  )
}

export default ShowCase