import React from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import MemberDossierForm from '../pages/MemberDossierForm';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/society" element={<MemberDossierForm />} />
      </Route>
    </Routes>

  )
}

export default MainRoutes
