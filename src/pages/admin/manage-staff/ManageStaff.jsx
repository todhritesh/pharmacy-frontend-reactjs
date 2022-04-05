import { Button, Dialog, Grid, IconButton, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import CustomTableContainer from '../../../components/CustomTableContainer';
import AddIcon from '@mui/icons-material/Add';
import StaffDialog from './AddStaff'
import { TokenContext } from '../../../context/context';
import { useAuthAxios } from '../../../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CustomDivider from '../../../components/CustomDivider';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import EditStaffDialog from './EditStaff';
import CustomTableCell from '../../../components/CustomTableCell';


const useStyles = makeStyles({
    headerFont: {
        fontSize: '18px',
        fontWeight: 'bold'
    }
})


function ManageStaff() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const authAxios = useAuthAxios()
    const [staffData, setStaffData] = useState([])
    const { setToken } = useContext(TokenContext)
    const [opneStaffDialog, setOpneStaffDialog] = useState(false)
    const [editId ,setEditId] = useState('')
    const [opneEditStaffDialog, setOpneEditStaffDialog] = useState(false)
    const classes = useStyles()


    async function getData() {
        try {
            const res = await authAxios('/admin/manage-staff');
            const data = res.data.staffs
            setStaffData(data);
            setIsLoading(false)
        } catch (err) {
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
    }, [])

    function handleEditForm(id){
        setEditId(id)
        setOpneEditStaffDialog(true)
    }

    return (
        <Grid container >
            <Grid xs={12} item>
                <Stack sx={{ my: 2 }} direction={{ sm: "row", xs: 'column' }} justifyContent="space-between">
                    <Typography variant='h3'>Manage Staff</Typography>
                    <Button size="small" sx={{ whiteSpace: "nowrap" }} onClick={() => setOpneStaffDialog(true)} endIcon={<AddIcon />} variant="contained" color="secondary" >Add Staff</Button>
                </Stack>
                <Box sx={{ mb: 2 }} >
                    <CustomDivider />
                </Box>
                <CustomTableContainer>
                    <TableHead>
                        <TableRow >
                            <TableCell className={classes.headerFont} >Sl no</TableCell>
                            <TableCell className={classes.headerFont} >Name</TableCell>
                            <TableCell className={classes.headerFont} >Phone no.</TableCell>
                            <TableCell className={classes.headerFont} >Email</TableCell>
                            <TableCell className={classes.headerFont} >Joined</TableCell>
                            <TableCell className={classes.headerFont} >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading ?
                                (
                                    <>
                                        <TableRow >
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                            <TableCell><Skeleton width="100%" variant="h6" animation="wave" ><Typography>.</Typography></Skeleton></TableCell>
                                        </TableRow>
                                    </>
                                )

                                :
                                (
                                    staffData.map((item, i) => (
                                        <TableRow key={i}>
                                            <CustomTableCell item={i+1} />
                                            <CustomTableCell item={item.name} />
                                            <CustomTableCell item={item.phone} />
                                            <CustomTableCell item={item.email} />
                                            <CustomTableCell item={item.created_at} />
                                            <CustomTableCell item={
                                                <IconButton onClick={() => handleEditForm(item.id)} variant="contained" color="secondary" ><EditIcon /></IconButton>
                                            } />
                                        </TableRow>
                                    ))
                                )
                        }
                    </TableBody>
                </CustomTableContainer>
            </Grid>
            <StaffDialog
                setStaffData={setStaffData}
                staffData={staffData}
                setOpneStaffDialog={setOpneStaffDialog}
                opneStaffDialog={opneStaffDialog}
             />
            <EditStaffDialog
                setStaffData={setStaffData}
                staffData={staffData}
                setOpneEditStaffDialog={setOpneEditStaffDialog}
                opneEditStaffDialog={opneEditStaffDialog}
                editId={editId}
                setEditId={setEditId}
             />
        </Grid>
    )
}

export default ManageStaff


