import { Card, CardContent, Skeleton, Typography } from '@mui/material'
import React from 'react'

function DashboardCard({ title, count ,isLoading}) {
  return (
    isLoading ?
      (
        <Card square elevation={0} sx={{ border: "3px solid #9c27b0",background:"#fbe8ff" }}>
          <CardContent>
          <Skeleton animation="pulse" variant='h5' width={"100%"}>
            <Typography sx={{mb:2}} variant='h5'>
              .
            </Typography>
          </Skeleton>
          <Skeleton animation="pulse" variant='h2' width={"100%"}>
            <Typography variant='h2'>
              .
            </Typography>
          </Skeleton>
          </CardContent>
        </Card>
      )
      :
      (
        <Card square elevation={0} sx={{ border: "3px solid #9c27b0",background:"#fbe8ff" }}>
          <CardContent  sx={{minHeight:'170px'}} >
            <Typography sx={{mb:2}} variant='h5'>
              {title}
            </Typography>
            <Typography variant='h2'>
              {` ${count}`}
            </Typography>
          </CardContent>
        </Card>
      )
  )
}

export default DashboardCard