import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import { ListItemButton } from '@mui/material';
import CustomDivider from './CustomDivider';
import { Outlet, useNavigate } from 'react-router-dom';
import {TokenContext} from '../context/context'
import { fontWeight } from '@mui/system';
import { useAuthAxios } from '../api/api';
import { toast } from 'react-toastify';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('sm')]:{
      marginLeft: `2*${drawerWidth}px`,
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      [theme.breakpoints.down('sm')]:{
        marginLeft: `-${drawerWidth}px`,
      },
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    padding:theme.spacing(1.5),
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // width: `calc(100% - ${drawerWidth}px)`,
    paddingLeft: `${drawerWidth}px`,
    [theme.breakpoints.down('sm')]:{
      paddingLeft:0,
    },
    transition: theme.transitions.create(['padding'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // boxShadow:theme.shadows(19),
  padding: theme.spacing(3,0),
  [theme.breakpoints.down('sm')]:{
    padding:theme.spacing(2.5,0),
    },
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

export default function Sidebar({location}) {
  const {token,setToken} = React.useContext(TokenContext)
  const navigate = useNavigate()
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const authAxios = useAuthAxios()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleLogout(){
    authAxios.defaults.headers.common['Authorization'] = '';
    setToken({token:'',role:''});
    sessionStorage.clear();
    toast.success('Successfully logged out')
    navigate('/');
  }
  
  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="secondary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {
              !open &&
              <Typography variant="h5" noWrap component="div">
            Pharmacy
          </Typography>
          }
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',border:'none'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{background:'#9c27b0',boxShadow:4}} >
            <Typography sx={{color:'white',m:"0 auto"}}  variant="h5">
            Pharmacy
          </Typography>
          <IconButton sx={{color:'white'}}  onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{borderRight:"3px solid #f7caff",background:"#fbe7ff",minHeight:"90vh"}}>
            {
              token.role === 'admin' &&
            <List>
                <ListItem>
                    <ListItemButton onClick={()=>navigate('/admin/dashboard')} sx={{color:"#c161d1",fontWeight:'bolder'}} >Home</ListItemButton>
                </ListItem>
                <CustomDivider/>
                <ListItem>
                  <ListItemButton onClick={()=>navigate('/admin/manage-staff')} sx={{color:"#c161d1",fontWeight:'bolder'}} >Manage Staff</ListItemButton>
                </ListItem>
                <CustomDivider/>
                <ListItem>
                  <ListItemButton onClick={()=>navigate('/admin/manage-pharmacist')} sx={{color:"#c161d1",fontWeight:'bolder'}} >Manage Pharmacist</ListItemButton>
                </ListItem>
                <CustomDivider/>
                <ListItem>
                  <ListItemButton onClick={()=>navigate('/admin/stats/monthly-sale')} sx={{color:"#c161d1",fontWeight:'bolder'}} >Monthly Sale</ListItemButton>
                </ListItem>
                <CustomDivider/>
            </List>
            }

            {
              token.role === 'pharmacist' &&
            <List>
              <ListItem>
                  <ListItemButton onClick={()=>navigate('/pharmacist/dashboard')} sx={{color:"#c161d1",fontWeight:'bolder'}} >Dashboard</ListItemButton>
              </ListItem>
                <CustomDivider/>
                <ListItem>
                  <ListItemButton onClick={()=>navigate('/pharmacist/manage-stocks/')} sx={{color:"#c161d1",fontWeight:'bolder'}} >Total Stocks</ListItemButton>
                </ListItem>
                <CustomDivider/>
                <ListItem>
                  <ListItemButton onClick={()=>navigate('/pharmacist/manage-stocks/expired')} sx={{color:"#c161d1",fontWeight:'bolder'}} >Expired Stocks</ListItemButton>
                </ListItem>
                <CustomDivider/>
                <ListItem>
                  <ListItemButton onClick={()=>navigate('/pharmacist/manage-stocks/sellable')} sx={{color:"#c161d1",fontWeight:'bolder'}} >Sellable Stocks</ListItemButton>
                </ListItem>
                <CustomDivider/>
              
            </List>
            }

            {
              token.role === 'staff' &&
            <List>
              <ListItem>
                  <ListItemButton onClick={()=>navigate('/staff/dashboard')} sx={{color:"#c161d1",fontWeight:'bolder'}} >Dashboard</ListItemButton>
              </ListItem>
              <CustomDivider/>
              <ListItem>
                  <ListItemButton onClick={()=>navigate('/staff/sell/')} sx={{color:"#c161d1",fontWeight:'bolder'}} >Sell</ListItemButton>
              </ListItem>
              <CustomDivider/>
              <ListItem>
                  <ListItemButton onClick={()=>navigate('/staff/available/stocks')} sx={{color:"#c161d1",fontWeight:'bolder'}} >Available Stocks</ListItemButton>
              </ListItem>
              <CustomDivider/>
              
            </List>
            }

              <ListItem>
                <ListItemButton onClick={handleLogout} sx={{color:"rgb(255 58 58)",fontWeight:'bolder'}} >Logout</ListItemButton>
              </ListItem>
        </Box>
      </Drawer>
      <Main sx={{mt:2}} open={open}>
        <DrawerHeader />
        <Outlet/>
      </Main>
    </Box>
  );
}
