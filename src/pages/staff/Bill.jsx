import { CardMedia, Grid, TableBody, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import CustomTableCell from '../../../components/CustomTableCell'
import CustomTableContainer from '../../../components/CustomTableContainer'
import { toast } from 'react-toastify'

function Bill() {

    return (
        <Grid container>
            <Grid item md={10}>
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
                </CustomTableContainer>
            </Grid>
        </Grid>
    )
}

export default Bill