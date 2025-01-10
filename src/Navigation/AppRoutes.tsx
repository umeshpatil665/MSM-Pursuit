import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@/module/AppLayout/AppLayout";
import Login from "@/module/Auth/Login";
import Home from "@/module/Home/Home";
import Profile from "@/module/Profile/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Unauthenticated Routes */}
      <Route path="login" element={<Login />} />

      {/* Authenticated Routes */}
      <Route element={<AppLayout />}>
        <Route path="dashboard" element={<Home />} />

        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Default Route */}
      <Route path="*" element={<Navigate to="/pages/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
