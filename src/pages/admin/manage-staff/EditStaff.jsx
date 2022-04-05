import { CardContent, Dialog, DialogContent, DialogTitle, Grid, Button, Typography,  } from "@mui/material";
import { useForm } from "react-hook-form";
import  * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import CustomTextField from "../../../components/CustomTextField";
import CustomDivider from "../../../components/CustomDivider";
import { useAuthAxios } from "../../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const staffSchema = yup.object().shape({
    "name":yup.string().required().min(2),
    "email":yup.string().email().required(),
    "phone":yup.string().min(10).max(10).required(),
})


const EditStaffDialog = ({staffData,setStaffData,setOpneEditStaffDialog,opneEditStaffDialog,editId , setEditId}) => {
    const navigate = useNavigate()
    const authAxios = useAuthAxios()
    const {control , handleSubmit , setValue , reset , formState:{errors}} = useForm({
        resolver:yupResolver(staffSchema),
        mode:'onChange',
        defaultValues:{
            "name":"",
            "phone":"",
            "email":"",
        }
    })

    useEffect(()=>{
        async function getEditData(){
            if(opneEditStaffDialog && editId!=''){
                try{
                    const res = await authAxios(`/admin/manage-staff/${editId}`);
                    const {name , phone , email} = res.data.staff
                    setValue('name',name)
                    setValue('phone',phone)
                    setValue('email',email)
                }catch(err){
                    if(err?.response?.data?.message === 'Unauthenticated.'){
                        toast.error("You are unauthenticated , please login")
                        navigate("/")
                    }
                    if(err?.response?.data?.error?.email?.[0]=== "The email has already been taken."){
                        toast.error("The email has already been taken.")
                    }
                    if(err?.response?.data?.error?.phone?.[0]=== "The phone has already been taken."){
                        toast.error("The phone no. has already been taken.")
                    }
                }
            }
        }

        getEditData()
    },[editId])

    function clearFormFields(){
        setValue('name','')
        setValue('phone','')
        setValue('email','')
    }

    function handleCloseEditForm(){
        clearFormFields()
        setOpneEditStaffDialog(false)
        setEditId('')
    }

    async function formSubmit(data){
        try{
            const {name , email , phone } = data
            const res = await authAxios.put(`/admin/manage-staff/${editId}`,{
                name,email,phone
            })
            const temp = res.data.staff;
            const updatedData = staffData.map(item=>{
                if(item.id===temp.id){
                    return temp
                }else{
                    return item
                }
            })
            setStaffData(updatedData);
            toast.success("Staff updated successfully");
            handleCloseEditForm()
        }catch(err){
            if(err?.response?.data?.message === 'Unauthenticated.'){
                toast.error("You are unauthenticated , please login")
                navigate("/")
            }
            if(err?.response?.data?.error?.email?.[0]=== "The email has already been taken."){
                toast.error("The email has already been taken.")
            }
            if(err?.response?.data?.error?.phone?.[0]=== "The phone has already been taken."){
                toast.error("The phone no. has already been taken.")
            }
        }
    }

    return (
    <Dialog onClose={handleCloseEditForm} open={opneEditStaffDialog}>
        <DialogTitle>
            <Typography variant="h4">Edit Staff</Typography>
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
                        
                        <Grid sx={{mt:1}} item xs={12}>
                            <Button type="submit" variant="contained" color="secondary" >Add Staff</Button>
                            <Button onClick={handleCloseEditForm} variant="contained" sx={{ml:2,backgroundColor:"#dcdcdd",color:'black','&:hover':{backgroundColor:'#a9a9af'}}}  >Cancle</Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </DialogContent >
    </Dialog>
)}


export default  EditStaffDialog;
