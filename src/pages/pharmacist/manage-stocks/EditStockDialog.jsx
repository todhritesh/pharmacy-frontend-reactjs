import { CardContent, Dialog, DialogContent, DialogTitle, Grid, Button, Typography,  } from "@mui/material";
import { useForm } from "react-hook-form";
import  * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import CustomTextField from "../../../components/CustomTextField";
import CustomDivider from "../../../components/CustomDivider";
import { useAuthAxios } from "../../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const stockSchema = yup.object().shape({
    "mfd":yup.date("This field is required").max(new Date()).required("This field is required"),
    "exp":yup.date("This field is required").min(new Date()).required("This field is required"),
    "name":yup.string().required(),
    "total_qty":yup.number().min(50).required("Total quantity filed is required"),
    "remaining_qty":yup.number().lessThan(yup.ref('total_qty'),"Item must be less than total qty").required("Total quantity filed is required"),
    "price_per_peice":yup.number().required(),
    "brand":yup.string().required(),
    "gst":yup.number().required(),
    "sp":yup.number().required(),
    "category":yup.string().required(),
})


const EditStockDialog = ({setStockData,stockData, setOpenEditStockDialog,openEditStockDialog,editId,setEditId}) => {

    const navigate = useNavigate()
    const authAxios = useAuthAxios()
    const {control , handleSubmit , setValue ,  reset , formState:{errors}} = useForm({
        resolver:yupResolver(stockSchema),
        mode:'onChange',
        defaultValues:{
            "exp":'',
            "mfd":'',
            "name":"",
            "total_qty":"",
            "remaining_qty":"",
            "price_per_peice":"",
            "brand":"",
            "gst":"",
            "sp":"",
            "category":"",
        }
    })

    async function formSubmit(data,e){
        try{
            const {remaining_qty,gst,name,price_per_peice,sp,total_qty,category,brand} = data
            const exp = data.exp.toLocaleDateString('en-uk').split('/').reverse().join('-');
            const mfd = data.mfd.toLocaleDateString('en-uk').split('/').reverse().join('-');
            const formData = {exp,remaining_qty,mfd,gst,name,price_per_peice,sp,total_qty,category,brand}
            const res = await authAxios.put(`/pharmacist/manage-stocks/${editId}`,formData)
            const updatedData = stockData.map(item=>{
                if(item.id===editId){
                    return res.data.stock;
                }else{
                    return item;
                }
            })
            setStockData(updatedData)
            toast.success("Stock updated successfully");
            reset()
            setOpenEditStockDialog(false)
            setEditId('')
        }catch(err){
            console.log(err?.response?.data)
            if(err?.response?.data?.message === 'Unauthenticated.'){
                toast.error("You are unauthenticated , please login")
                navigate("/")
            }
        }
    }

    function fillForm(){
        const data = stockData.filter(item=>item.id===editId)[0]
        setValue('name',data.name)
        setValue('exp',data.exp)
        setValue('mfd',data.mfd)
        setValue('total_qty',data.total_qty)
        setValue('price_per_peice',data.price_per_peice)
        setValue('remaining_qty',data.remaining_qty)
        setValue('brand',data.brand)
        setValue('gst',data.gst)
        setValue('sp',data.sp)
        setValue('category',data.category)
    }
    useEffect(()=>{
        if(openEditStockDialog){
            fillForm()
        }
    },[openEditStockDialog])

    function handleFormClose(){
        setOpenEditStockDialog(false)
        editId('')
        setValue('name','')
        setValue('exp','')
        setValue('mfd','')
        setValue('total_qty','')
        setValue('remaining_qty','')
        setValue('price_per_peice','')
        setValue('brand','')
        setValue('gst','')
        setValue('sp','')
        setValue('category','')
    }


    return (
    <Dialog onClose={handleFormClose} open={openEditStockDialog}>
        <DialogTitle>
            <Typography variant="h4">Edit Stock</Typography>
        </DialogTitle>
        <DialogContent>
        <CustomDivider/>
            <CardContent>
                <form onSubmit={handleSubmit((data,e)=>formSubmit(data,e))} >
                    <Grid container >
                        <Grid item xs={12}>
                            <CustomTextField type="date" label={"Expiry date"} name="exp" control={control} error={errors.exp?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField label={"Name"} name="name" control={control} error={errors.name?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField label={"Total Qty"} name="total_qty" control={control} error={errors.total_qty?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField label={"Remaining Qty"} name="remaining_qty" control={control} error={errors.remaining_qty?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField label={"Price per peice"} name="price_per_peice" control={control} error={errors.price_per_peice?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField label={"Brand"} name="brand" control={control} error={errors.brand?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField label={"Category"} name="category" control={control} error={errors.category?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField label={"Gst"} name="gst" control={control} error={errors.gst?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField label={"Selling price"} name="sp" control={control} error={errors.sp?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField type="date" label={"Manufacturing date"} name="mfd" control={control} error={errors.mfd?.message} />
                        </Grid>
                        <Grid sx={{mt:1}} item xs={12}>
                            <Button type="submit" variant="contained" color="secondary" >Add Stock</Button>
                            <Button onClick={()=>setOpenEditStockDialog(false)} variant="contained" sx={{ml:2,backgroundColor:"#dcdcdd",color:'black','&:hover':{backgroundColor:'#a9a9af'}}}  >Cancle</Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </DialogContent >
    </Dialog>
)}


export default  EditStockDialog;
