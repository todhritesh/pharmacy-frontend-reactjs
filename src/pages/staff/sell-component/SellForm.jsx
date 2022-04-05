import { Autocomplete, Button, Card, Divider, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from '../../../components/CustomTextField'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import {useAuthAxios} from '../../../api/api'
import { TokenContext } from '../../../context/context'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'

const schema = yup.object().shape({
    'radio': yup.string().required(),
    'name': yup.string().when('radio',{is:'new',then:yup.string().required()}),
    'phone': yup.string().when('radio',{is:'new',then:yup.string().min(10).max(10).required()}),
    'old_phone': yup.string().when('radio',{is:'old',then:yup.string().min(10).max(10).required()}),
    'email': yup.string().when('radio',{is:'new',then:yup.string().email().required()})
})


function SellForm({itemData,setCustomer,setItemData,setOpen,countTotal,setCountTotal}) {
    const [radioValue,setRadioValue] = useState('new')
    const autoRef = useRef()
    const qtyRef = useRef()
    const {setToken} = useContext(TokenContext)
    const navigate = useNavigate()
    const authAxios = useAuthAxios()
    const [value, setValue] = useState('');
    const [qty, setQty] = useState('');
    const [autoCompleteData, setAutoCompleteData] = useState([])

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues:{
            'name':'',
            'email':'',
            'phone':'',
            'old_phone':'',
            'radio':'new',
        }
    })

    async function submitForm(data){
        if(itemData.length<=0){
            toast.error('Please select item')
            return ;
        }
        let formData;
        if(radioValue==='new'){
            const {name,email,phone} = data;
            formData={name,email,phone}
        }
        if(radioValue==='old'){
            const {old_phone} = data;
            formData={old_phone}
        }
        try{
            const res =await authAxios.post(`/staff/checkuser/${radioValue}`,formData)
            setCustomer(formData);
            setOpen(true)
        }catch(err){
            if(radioValue==='old'){
                if(err?.response?.data?.error?.old_phone[0]==="The selected old phone is invalid."){
                    toast.error("The selected old phone is invalid.")
                }else{
                    toast.error("Something went wrong")
                }
            }
            if(radioValue==='new'){
                if(err?.response?.data?.error?.email[0]==="The email has already been taken."){
                    toast.error("The email has already been taken.")
                }
                if(err?.response?.data?.error?.email[0]==="The phone has already been taken."){
                    toast.error("The phone has already been taken.")
                }
            }

        }
        
    }

     
    async function getData() {
    try {
        const res = await authAxios('/staff/autocomplete/data/');
        const data = res.data.stocks
        setAutoCompleteData(data);
        // setIsLoading(false)
    } catch (err) {
        console.log(err?.response.data)
        if (err?.response?.data?.message === 'Unauthenticated.') {
            toast.error("You are unauthenticated , please login")
            navigate("/")
        }
    }
    }
    useEffect(() => {
        const sessionToken = sessionStorage.getItem('token');
        const sessionRole = sessionStorage.getItem('role');
        sessionToken && setToken({ token: sessionToken, role: sessionRole })
        sessionToken && sessionStorage.getItem('token') && (authAxios.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`);
        getData()
        calculateTotal()
    }, [itemData])


    function handleQty(e) {
        if (e.target.value > value.remaining_qty) {
            e.target.value = qty
            toast.error('Quantity limit exceeded')
            return;
        }
        setQty(e.target.value);
    }

    function handleAddItem(){
        const check = itemData.some(item=>item.id==value.id);
        if(check){
            toast.error('Cannot add duplicate items')
            return ;
        }
        setItemData([...itemData,{...value,qty}])
        setValue('')
        setQty('')
        qtyRef.current.value = ''
        const ele = autoRef.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0]
        if(ele) ele.click()
    }

    function calculateTotal(){
        const total = itemData.reduce((acc,curr)=>{
            const gst = (curr.qty * curr.sp * curr.gst)/100
            acc += ((curr.qty * curr.sp) + gst)
            return acc;
        },0)
        Math.round(Number(total))
        setCountTotal(total);
    }

    
    return (
        <Grid item container >
            <Grid container component={Card} elevation={10} sx={{ mx: 'auto', background: '#fbe7ff', p: 4, pl: 6, pt: 6 }} item xs={12}>
                <Grid onSubmit={handleSubmit(data=>submitForm(data))} component={'form'} spacing={1} container item xs={12}>
                    <Grid sx={{ px: 2, background: '#fdf5ff', border: '2px solid #9c27b0' }} elevation={0} component={Card} spacing={1} container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Customer details</Typography>
                        </Grid>
                        {radioValue==='new'?
                        <>
                            <Grid item xs={12}>
                                <CustomTextField label={'Name'} control={control} error={errors.name?.message} name='name' />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField label={'Email'} control={control} error={errors.email?.message} name='email' />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField label={'Phone'} control={control} error={errors.phone?.message} name='phone' />
                            </Grid>
                        </>
                        :
                        <>
                            <Grid item xs={12}>
                                <CustomTextField label={'Old Phone Number'} control={control} error={errors.old_phone?.message} name='old_phone' />
                            </Grid>
                        </>
                        }
                        <Controller
                        control={control}
                        name="radio"
                        render={({field})=>(
                            <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            {...field}
                            onChange={(e) => {
                                field.onChange(e); 
                                setRadioValue(e.target.value); 
                              }}
                            row
                        >
                            <FormControlLabel value="new" control={<Radio />} label="New Customer" />
                            <FormControlLabel value="old" control={<Radio />} label="Old Customer" />
                        </RadioGroup>
                        )}
                        />
                    </Grid>
                    <Grid sx={{ px: 2, pb: 2, mt: 2, background: '#fdf5ff', border: '2px solid #9c27b0' }} elevation={0} component={Card} spacing={1} container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Add item</Typography>
                        </Grid>
                        <Grid item xs={9} >
                            <Typography sx={{ mb: .5 }} variant="body1">Item</Typography>
                            <Autocomplete
                                // value={value}
                                ref={autoRef}
                                onChange={(e,val)=>setValue(val)}
                                includeInputInList={true}
                                size="small"
                                disablePortal
                                id="country-select-demo"
                                options={autoCompleteData}
                                getOptionLabel={(option) => option.label ?? value}
                                renderOption={(props, option) => (
                                    <Box component="div" sx={{ '& > img': { flexShrink:0 },display:'flex',flexDirection:'column',borderBottom:'3px solid #f7defc ' }} {...props}>
                                        <Box>
                                        <img
                                            loading="lazy"
                                            width="20"
                                            src={option.image_link}
                                            alt=""
                                        />
                                        &nbsp;&nbsp;{`Item : ${option.label}`}
                                        </Box>
                                        <Box>{`available qty : ${option.remaining_qty}`}</Box>
                                        <Box>{`expiry date : ${option.custom_exp}`}</Box>
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill

                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography sx={{ mb: .5 }} variant="body1">Qty</Typography>
                            <TextField type="number" name="qty" inputRef={qtyRef} disabled={!Boolean(value)} size="small" onChange={handleQty} />
                        </Grid>
                        <Grid item xs={6}>
                            <Button disabled={!Boolean(qty)} onClick={handleAddItem} variant="contained" color="secondary" >Add</Button>
                        </Grid>
                    </Grid>
                    <Grid sx={{ px: 2, pb: 2, mt: 2, background: '#fdf5ff', border: '2px solid #9c27b0' }} elevation={0} component={Card} spacing={1} container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Total : ₹{` ${countTotal}`}</Typography>
                        </Grid>
                    </Grid>
                    <Grid sx={{ ml: -2, mt: 1 }} item xs={12}>
                        <Button size="large" type="submit" variant='contained' color="secondary">Contunue</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SellForm