import { TableCell } from '@mui/material'
import React from 'react'

function CustomTableCell({item,size,weight}) {
  return (
    <TableCell
        sx={{
            fontSize:size || '16px',
            fontWeight:weight || 'normal'
        }}
        align="center"
    >
        {item}
    </TableCell>
  )
}

export default CustomTableCell