import { User } from "@/src/providers/auth/AuthContext";
import { cookies } from "next/headers";

interface BetterAuthSession {
  success: boolean;
  errors: string;
  message: string;
  statusCode: number;
  data: {
    user: User;
    [key: string]: unknown;
  };
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

  return {
    userData: data?.data || null,
  };
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
  signOut
};
