"use client";
import { ReactNode, useEffect, useState } from "react";
import AuthContext, { User } from "./AuthContext";
import { getSessionAction } from "@/src/service/auth/auth.action";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function initializedAuth() {
      try {
        const response = await getSessionAction();

        console.log("user data ", response);
      } catch (error) {
        console.error("Failed to sync session", error);
      } finally {
        setLoading(false);
      }
    }

    initializedAuth();
  }, []);

  const values = {
    user,
    isAuthenticated: !!user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={values}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
