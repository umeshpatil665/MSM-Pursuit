import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import AppRoutes from "./AppRoutes";
import AuthRoutes from "./AuthRoutes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { loginReducerState } from "@/redux/Slicer/loginSlicer";

const { PUBLIC_URL } = import.meta.env;

const Navigations = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { loginData } = useSelector((state: RootState) =>
    loginReducerState(state)
  );
  console.log(import.meta.env.PUBLIC_URL);
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      {/* <Routes>
        <Route element={<App />}>
          {
            isAuthenticated
          // loginData&&loginData?.isLogin 
          ? (
            <>
              <Route path="/*" element={<AppRoutes />} />

              <Route index element={<Navigate to="/dashboard"   replace/>} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthRoutes />} />
              <Route path="*" element={<Navigate to="/auth"  replace/>}  />
            </>
          )}
        </Route>
      </Routes> */}
      <Routes>
        <Route element={<App />}>
          <Route path="pages/*" element={<AppRoutes />} />
          <Route path="*" element={<Navigate to="/pages/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigations;
