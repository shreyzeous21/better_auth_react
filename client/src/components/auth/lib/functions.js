import { signIn, signUp, signOut, getSession } from "@/lib/auth-client";

export const login = async ({ email, password }) => {
  const { data, error } = await signIn.email({ email, password });
  if (error) throw error;
  return data;
};

export const register = async ({ name, email, password }) => {
  const { data, error } = await signUp.email({ name, email, password });
  if (error) throw error;
  return data;
};

export const logout = async () => {
  const { error } = await signOut();
  if (error) throw error;
};
