import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import {
  Login,
  Sidebar,
  AdminDashboard,
  ManageStaff,
  ManagePharmacist,
  PharmacistDashboard,
  TotalStock,
  ExpiredStock,
  SellableStock,
  StaffDashboard,
  AvailableStocks,
  Sell,
  MonthlySale

}
  from './index'

function RoutesContainer() {
  const location = useLocation()
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/*" element={<Sidebar location={location.pathname} />}>
        {/* admin */}
        <Route exact path="admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="admin/manage-staff" element={<ManageStaff />} />
        <Route exact path="admin/manage-pharmacist" element={<ManagePharmacist />} />
        <Route exact path='admin/stats/monthly-sale' element={<MonthlySale />} />
        {/* admin */}

        {/* pharmacist */}
        <Route exact path="pharmacist/dashboard" element={<PharmacistDashboard />} />
        <Route exact path="pharmacist/manage-stocks/" element={<TotalStock />} />
        <Route exact path="pharmacist/manage-stocks/expired" element={<ExpiredStock />} />
        <Route exact path="pharmacist/manage-stocks/sellable" element={<SellableStock />} />
        {/* pharmacist */}

        {/* staff */}
        <Route exact path="staff/dashboard" element={<StaffDashboard />} />
        <Route exact path="staff/available/stocks" element={<AvailableStocks />} />
        <Route exact path="staff/sell" element={<Sell />} />
        
        {/* staff */}
      </Route>
    </Routes>
  )
}

export default RoutesContainer