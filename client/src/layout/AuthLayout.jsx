import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function AuthLayout({ requireAuth = false }) {
  const { data: session, isPending } = useSession();

  if (isPending)
    return (
      <div className="min-h-screen flex items-center justify-center mx-auto px-4">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (requireAuth && !session?.user) return <Navigate to={"/login"} replace />;

  if (!requireAuth && session?.user) return <Navigate to={"/"} replace />;

  return <Outlet />;
}
