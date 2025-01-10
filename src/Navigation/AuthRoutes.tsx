import Login from '@/module/Auth/Login'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'





const AuthRoutes = () => {

    return (
        <Routes>
            <Route path="login/*" element={<Login />} />
            {/* <Route path="register/*" element={<ERegitrationRoutePage />} /> */}
            {/* <Route path="register/*" element={<NewRegistrationMain />} /> */}
            {/* <Route path='forgot-password/*' element={<ForgotRoutePage />} />
            <Route path='onboarding/*' element={<OnboardingRoutes />} /> */}
            <Route index element={<Login />} />
        </Routes>
    )
}

export default AuthRoutes

