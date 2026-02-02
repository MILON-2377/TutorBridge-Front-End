"use client"

import { UserRoleType } from "@/src/lib/constants";
import { createContext } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role?: UserRoleType;
  onboardingStatus: string;
  image: string | null;
  emailVerified: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
