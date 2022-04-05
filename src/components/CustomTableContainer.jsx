import { Paper, Table, TableContainer } from '@mui/material'
import React from 'react'

function CustomTableContainer({children}) {
  return (
    <Paper square sx={{mx:'auto',whiteSpace:'nowrap',background:"#fbe3ff",overFlow:'scroll',maxWidth:'90vw'}}>
        <TableContainer>
            <Table sx={{display:'inline-block',maxHeight:'70vh'}}>
                {children}
            </Table>
        </TableContainer>
    </Paper>
  )
}

export default CustomTableContainer