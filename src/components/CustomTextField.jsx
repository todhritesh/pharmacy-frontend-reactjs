import { FormControl, TextField, Typography } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

function CustomTextField({error , type , control , name , label}) {
  return (
    <FormControl sx={{mb:2}} fullWidth>
        <Typography sx={{mb:.5}} variant="body1">{label}</Typography>
        <Controller
        control={control}
        name={name}
        render={({field})=>(
            <TextField type={type || "text"}  error={Boolean(error)} helperText={error} {...field} size='small' />
        )}
        />
    </FormControl>
  )
}

export default CustomTextField