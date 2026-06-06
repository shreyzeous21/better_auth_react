import React from "react";
import { Route, Routes } from "react-router";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import Home from "./layout/Home";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignupForm />} />
      </Routes>
    </>
  );
}
