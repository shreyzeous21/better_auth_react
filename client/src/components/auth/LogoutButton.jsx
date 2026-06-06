import { signOut } from "@/lib/auth-client";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { handleLogout } from "./lib/actions";

export default function LogoutButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => handleLogout(navigate)}
      variant="destructive"
      className={"flex items-center gap-2"}
    >
      <LogOutIcon />
      Logout
    </Button>
  );
}
