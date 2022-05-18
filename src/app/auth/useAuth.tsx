import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export function useAuth() {
  const value = useContext(AuthContext);
  return value
}