import { CardContent, Dialog, DialogContent, DialogTitle, Grid, Button, Typography,  } from "@mui/material";
import { useForm } from "react-hook-form";
import  * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import CustomTextField from "../../../components/CustomTextField";
import CustomDivider from "../../../components/CustomDivider";
import { useAuthAxios } from "../../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const pharmacistSchema = yup.object().shape({
    "name":yup.string().required().min(2),
    "email":yup.string().email().required(),
    "phone":yup.string().min(10).max(10).required(),
    "password":yup.string().min(6).required(),
    "confirm_password":yup.string().min(6).required("confirm password is required").oneOf([yup.ref('password')],"password must match"),
})


const PharmaCistDialog = ({setPharmacistData,pharmacistData, setOpnePharmacistDialog,opnePharmacistDialog}) => {

    const navigate = useNavigate()
    const authAxios = useAuthAxios()
    const {control , handleSubmit , reset , setError , formState:{errors}} = useForm({
        resolver:yupResolver(pharmacistSchema),
        mode:'onChange',
        defaultValues:{
            "name":'',
            "email":'',
            "phone":'',
            "password":'',
            "confirm_password":'',
        }
    })

    async function formSubmit(data){
        try{
            const {name , password , email , phone , confirm_password} = data
            const res = await authAxios.post("/admin/manage-pharmacist",{
                name,password,email , phone , confirm_password
            })
            console.log(res.data)
            setPharmacistData([...pharmacistData,res.data.user])
            toast.success("Pharmacist added successfully");
            reset()
            setOpnePharmacistDialog(false)
        }catch(err){
            console.log(err)
            if(err?.response?.data?.message === 'Unauthenticated.'){
                toast.error("You are unauthenticated , please login")
                navigate("/")
            }
            if(err?.response?.data?.error?.email?.[0]=== "The email has already been taken."){
                toast.error("The email has already been taken.")
                reset({
                    'email':''
                })
                setError('email')
            }
            if(err?.response?.data?.error?.phone?.[0]=== "The phone has already been taken."){
                toast.error("The phone no. has already been taken.")
                reset({
                    'phone':''
                })
                setError('phone')
            }
        }
    }

    return (
    <Dialog onClose={()=>setOpnePharmacistDialog(false)} open={opnePharmacistDialog}>
        <DialogTitle>
            <Typography variant="h4">Add Pharmacist</Typography>
        </DialogTitle>
        <DialogContent>
        <CustomDivider/>
            <CardContent>
                <form onSubmit={handleSubmit((data)=>formSubmit(data))} >
                    <Grid container >
                        <Grid item xs={12}>
                            <CustomTextField label={"Name"} name="name" control={control} error={errors.name?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField label={"Email"} name="email" control={control} error={errors.email?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField label={"Phone"} name="phone" control={control} error={errors.phone?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField type="password" label={"Password"} name="password" control={control} error={errors.password?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField type="password" label={"Confirm password"} name="confirm_password" control={control} error={errors.confirm_password?.message} />
                        </Grid>
                        <Grid sx={{mt:1}} item xs={12}>
                            <Button type="submit" variant="contained" color="secondary" >Add PharmaCist</Button>
                            <Button onClick={()=>setOpnePharmacistDialog(false)} variant="contained" sx={{ml:2,backgroundColor:"#dcdcdd",color:'black','&:hover':{backgroundColor:'#a9a9af'}}}  >Cancle</Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </DialogContent >
    </Dialog>
)}


export default  PharmaCistDialog;
