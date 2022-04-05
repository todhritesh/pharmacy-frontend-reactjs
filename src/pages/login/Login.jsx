import { Box, Button, Card, CardContent, CardHeader, CardMedia, Paper, TextField, Typography } from '@mui/material'
import React,{useContext} from 'react'
import Navbar from '../../components/Navbar'
import { Grid } from '@mui/material';
import CustomDivider from '../../components/CustomDivider';
import CustomTextField from '../../components/CustomTextField';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
// import logo22 from '../../assets/images/logo22.png'
import {makeStyles} from '@mui/styles';
import { useTheme } from '@mui/material';
import {useAuthAxios, useAxios} from '../../api/api';
import { TokenContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useStyles = makeStyles(()=>{
    const theme = useTheme();
    return {
        hideImage:{
            [theme.breakpoints.down('md')]:{
                display:'none'
            }
        },
        formPadding:{
            padding:"0 50px",
            [theme.breakpoints.down('md')]:{
                padding:"0 10px",
            }
        },
        animateImage:{
            animation: `$myEffect 1000ms linear infinite`
        },
        "@keyframes myEffect":{
            "0%": {
                transform:"scale(1 ,1)"
                },
            "25%": {
                transform:"scale(1.2 ,1.2)"
            },
            "750%": {
                transform:"scale(1.4 ,1.4)"
            },
            "750%": {
                transform:"scale(1.2 ,1.2)"
            },
        }
    }
})

const loginSchema = yup.object().shape({
    'email':yup.string().email().required(),
    'password':yup.string().required().min(6)
})


function Login() {
    const navigate = useNavigate()
    const authAxios = useAuthAxios();
    const Axios = useAxios();
    const {setToken} = useContext(TokenContext)
    const classes = useStyles()
    const {control , handleSubmit , formState:{errors}} = useForm({
        resolver:yupResolver(loginSchema),
        defaultValues:{
            'email':'',
            'password':''
        }
    })

    const handleLogin = async (email , password) => {
        try{
            const res = await Axios.post("/login",{
                email , password
            })
            console.log(res.data);
            const {access_token , role } = res.data;
            window.sessionStorage.setItem("token",access_token);
            window.sessionStorage.setItem("role",role);
            setToken({'token':res.data.access_token,'role':res.data.role})
            authAxios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
            if(role==='admin'){
                toast.success("Logged in as admin")
                navigate('/admin/dashboard');
            }
            if(role==='pharmacist'){
                toast.success("Logged in as pharmacist")
                navigate('/pharmacist/dashboard');
            }
            if(role==='staff'){
                toast.success("Logged in as staff")
                navigate('/staff/dashboard');
            }
        }catch(err){
            console.log(err);
        }
    }

    const submitForm = (data) => {
        console.log(data)
        handleLogin(data.email ,  data.password)
    }

    return (
        <Box >
            <Navbar />
            <Grid container spacing={2}sx={{ mt: 3, px: 5 ,minHeight:'70vh'}}>
                <Grid className={classes.hideImage} item md={6.5} sx={{alignSelf:'center'}}>
                    <CardMedia
                    className={classes.animateImage}
                    component="img"
                    image={"https://cdn130.picsart.com/267481097012211.png"}
                    sx={{
                        minWidth:'500px',
                        height:'400px',
                        objectFit:'contain',
                        display:'inline-block',
                        transitionDuration:'0.5s', 
                        // backgroundImage:'url("https://img.lovepik.com/free-png/20220120/lovepik-blue-gradient-curve-material-png-image_401517719_wh300.png")'                       
                    }}
                    />
                </Grid>
                <Grid className={classes.formPadding} item md={5.5} sx={{my:"auto",alignSelf:'center',mx:'auto'}}>
                    <Card square elevation={15}>
                        <CardContent>
                            <Typography variant="h4">Login Here</Typography>
                        </CardContent>
                        <CustomDivider />
                        <CardContent>
                            <form onSubmit={handleSubmit((data)=>submitForm(data))}>
                                <Grid container>
                                    <Grid item xs={12} sx={{mb:1}}>
                                        <CustomTextField error = {errors.email?.message} label="Email" name="email" control={control}  />
                                    </Grid>
                                    <Grid item xs={12} sx={{mb:1}}>
                                        <CustomTextField error = {errors.password?.message} label="Password" name="password" control={control}  />
                                    </Grid>
                                    <Grid item xs={12} sx={{mt:1}}>
                                        <Button type="submit" variant="contained" color="secondary" >Submit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Login

