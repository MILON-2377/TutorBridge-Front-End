import { UserRoleType } from "@/src/lib/constants";
import { cookies } from "next/headers";

export interface User {
  id: string;
  email: string;
  name: string;
  role?: UserRoleType;
  onboardingStatus: string;
  image: string | null;
  emailVerified: boolean;
}

interface BetterAuthSession {
  success: boolean;
  errors: string;
  message: string;
  statusCode: number;
  data: User;
}

/**
 * Get session
 */
const getSession = async () => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  if (!cookieHeader) {
    console.log("No cookies found");
    return null;
  }

  const response = await fetch(`${process.env.AUTH_BASE_URL}/users/me`, {
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!response.ok) return null;

  const data: BetterAuthSession = await response.json();

  return data?.data ?? null;
};

/**
 * SignOut
 */
const signOut = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  if (!cookieHeader) {
    return {
      success: true,
    };
  }

  const response = await fetch(`${process.env.AUTH_BASE_URL}/auth/sign-out`, {
    method: "POST",
    credentials: "include",
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }

  return {
    success: true,
  };
};

export const AuthService = {
  getSession,
  signOut,
};
