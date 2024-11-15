"use client";

import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import StatusAuthLoginSuccess from "@/components/Status/auth-login-success";
import { Suspense } from "react";

const AuthLoginSuccessCallbackPage = () => {
  <Suspense fallback={<LoadingSpinner />}>
    <StatusAuthLoginSuccess />
  </Suspense>;
};

export default AuthLoginSuccessCallbackPage;
