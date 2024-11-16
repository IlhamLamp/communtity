"use client";

import ContentResetPassword from "@/components/Content/reset-password";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { Suspense } from "react";

const AuthLoginRedirectSetPasswordPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ContentResetPassword />
    </Suspense>
  );
};

export default AuthLoginRedirectSetPasswordPage;
