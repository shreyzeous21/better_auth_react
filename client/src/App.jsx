import React from "react";
import { Route, Routes } from "react-router";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import Home from "./layout/Home";
import { Toaster } from "./components/ui/sonner";
import { useSession } from "./lib/auth-client";
import AuthLayout from "./layout/AuthLayout";

export default function App() {
  const { data: session } = useSession();
  return (
    <>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignupForm />} />
        </Route>
      </Routes>
    </>
  );
}
