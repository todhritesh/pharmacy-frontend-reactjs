import { CardContent, Dialog, DialogContent, DialogTitle, Grid, Button, Typography,  } from "@mui/material";
import { useForm } from "react-hook-form";
import  * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import CustomTextField from "../../../components/CustomTextField";
import CustomDivider from "../../../components/CustomDivider";
import { useAuthAxios } from "../../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const stockSchema = yup.object().shape({
    "mfd":yup.date("This field is required").max(new Date()).required("This field is required"),
    "exp":yup.date("This field is required").min(new Date()).required("This field is required"),
    "name":yup.string().required(),
    "total_qty":yup.number().min(50).required("Total quantity filed is required"),
    "price_per_peice":yup.number().required(),
    "brand":yup.string().required(),
    "gst":yup.number().required(),
    "sp":yup.number().required(),
    "category":yup.string().required(),
})


const StockDialog = ({setStockData,stockData, setOpenStockDialog,openStockDialog}) => {

    const navigate = useNavigate()
    const authAxios = useAuthAxios()
    const {control , handleSubmit , reset , formState:{errors}} = useForm({
        resolver:yupResolver(stockSchema),
        mode:'onChange',
        defaultValues:{
            "exp":'',
            "mfd":'',
            "name":"",
            "total_qty":"",
            "price_per_peice":"",
            "brand":"",
            "gst":"",
            "sp":"",
            "category":"",
        }
    })

    async function formSubmit(data,e){
        // console.log(data)
        console.log(e.target.image.files[0])
        try{
            const image = e.target.image.files[0];
            const {gst,name,price_per_peice,sp,total_qty,category,brand} = data
            const exp = data.exp.toLocaleDateString('en-uk').split('/').reverse().join('-');
            const mfd = data.mfd.toLocaleDateString('en-uk').split('/').reverse().join('-');
            const formData = new FormData();
            formData.append('name',name)
            formData.append('gst',gst)
            formData.append('price_per_peice',price_per_peice)
            formData.append('sp',sp)
            formData.append('total_qty',total_qty)
            formData.append('category',category)
            formData.append('brand',brand)
            formData.append('exp',exp)
            formData.append('mfd',mfd)
            formData.append('image',image)
            console.log(authAxios())
            const res = await authAxios.post("/pharmacist/manage-stocks",formData)
            console.log(res.data)
            setStockData([...stockData,res.data.stock])
            toast.success("Stock added successfully");
            reset()
            setOpenStockDialog(false)
        }catch(err){
            console.log(err.response.data)
            if(err?.response?.data?.message === 'Unauthenticated.'){
                toast.error("You are unauthenticated , please login")
                navigate("/")
            }
        }
    }

    return (
    <Dialog onClose={()=>setOpenStockDialog(false)} open={openStockDialog}>
        <DialogTitle>
            <Typography variant="h4">Add Stock</Typography>
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
                        <Grid item xs={12}>
                            <CustomTextField type="file" label={"Manufacturing date"} name="image" control={control} error={errors.image?.message} />
                        </Grid>
                        <Grid sx={{mt:1}} item xs={12}>
                            <Button type="submit" variant="contained" color="secondary" >Add Stock</Button>
                            <Button onClick={()=>setOpenStockDialog(false)} variant="contained" sx={{ml:2,backgroundColor:"#dcdcdd",color:'black','&:hover':{backgroundColor:'#a9a9af'}}}  >Cancle</Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </DialogContent >
    </Dialog>
)}


export default  StockDialog;
