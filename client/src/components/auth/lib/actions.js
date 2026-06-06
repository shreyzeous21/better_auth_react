import { toast } from "sonner";
import { login, logout, register } from "./functions";

export const handleLogin = async (
  e,
  { email, password, setError, setLoading, navigate },
) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
    await login({ email, password });
    toast.success("Login successful");
    navigate("/");
  } catch (error) {
    toast.error(error?.message);
    setError(error?.message);
  } finally {
    setLoading(false);
  }
};

export const handleRegister = async (
  e,
  { name, email, password, setError, setLoading, navigate },
) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
    await register({ name, email, password });
    toast.success("Account created successfully");
    navigate("/");
  } catch (error) {
    toast.error(error?.message);
    setError(error?.message);
  } finally {
    setLoading(false);
  }
};

export const handleLogout = async (navigate) => {
  await logout();
  toast.success("Logged out successfully");
  navigate("/login");
};
