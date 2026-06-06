import { signOut } from "@/lib/auth-client";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

export default function LogoutButton() {
  const handleSubmit = async () => {
    try {
      await signOut();
      toast.success("Logout successfully!");
    } catch (error) {
      toast.error(error?.message ?? "something went wrong");
    }
  };
  return (
    <Button onClick={handleSubmit} variant="destructive">
      <LogOutIcon />
      Logout
    </Button>
  );
}
