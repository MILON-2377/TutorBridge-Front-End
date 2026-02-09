import { UserRoleType } from "@/src/lib/constants";
import { ApiResponse } from "@/src/types/response.types";
import { cookies } from "next/headers";
import { cache } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role?: UserRoleType;
  onboardingStatus: string;
  image: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
}

/**
 * Get session
 */
const getSession = cache(async (): Promise<ApiResponse<User>> => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (!cookieHeader) {
      return {
        success: false,
        data: null,
        status: 401,
        errors: "Unauthorized",
      };
    }

    const response = await fetch(`${process.env.AUTH_BASE_URL}/users/me`, {
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        data: null,
        status: response.status,
        errors: errorData.message || "Unauthorized",
      };
    }

    const result = await response.json();

    return {
      success: true,
      data: result.data,
      status: response.status,
      errors: null,
    };
  } catch (error) {
    console.log("User session error", error);

    let message = "";

    if (error instanceof Error) {
      message = error.message;
    }

    return {
      success: false,
      data: null,
      status: 500,
      errors: message || "Internal server error",
    };
  }
});

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
