import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles} from '@mui/styles';
import {useTheme} from "@mui/material/styles"
const useStyles = makeStyles(()=>{
    const theme = useTheme()
    return {
    root:{
        padding:theme.spacing(2),
        // paddingRight:theme.spacing(3),
    }
}})

export default function Navbar() {
    const classes  = useStyles()
  return (
      <AppBar position="static" color="secondary">
        <Toolbar  className={classes.root} >
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Pharmacy Login
          </Typography>
        </Toolbar>
      </AppBar>
  );
}
