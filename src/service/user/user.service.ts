import { ApiResponse } from "@/src/types/response.types";
import { User } from "../auth/auth.service";
import { cookies } from "next/headers";
import { ProfileInput } from "@/src/components/student/student.validation";
import { UserRoleType } from "@/src/lib/constants";

const updateProfile = async (
  payload: ProfileInput,
): Promise<ApiResponse<User>> => {
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
        errors: "No authentication cookies found",
      };
    }

    const response = await fetch(`${process.env.AUTH_BASE_URL}/users/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        errors: result?.message || "Failed to update profile",
      };
    }

    return {
      success: true,
      data: result.data,
      errors: null,
    };
  } catch (error) {
    console.error("Update profile error:", error);
    return {
      success: false,
      data: null,
      errors: "Unexpected server error",
    };
  }
};

export interface GetUsersQuery {
  search?: string;
  role?: UserRoleType;
  status?: "ACTIVE" | "INACTIVE" | "BLOCKED";
  page?: number;
  limit?: number;
}

interface GetUsersResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const getAllUsers = async (
  query?: GetUsersQuery,
): Promise<ApiResponse<GetUsersResponse>> => {
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
        errors: "No authentication cookies found",
      };
    }

    const searchParams = new URLSearchParams();

    if (query?.search) searchParams.set("search", query.search);
    if (query?.role) searchParams.set("role", query.role);
    if (query?.status) searchParams.set("status", query.status);
    if (query?.page) searchParams.set("page", query.page.toString());
    if (query?.limit) searchParams.set("limit", query.limit.toString());

    const response = await fetch(
      `${process.env.AUTH_BASE_URL}/users?${searchParams.toString()}`,
      {
        headers: {
          cookie: cookieHeader,
        },
        cache: "no-store",
      },
    );

    const result: ApiResponse<GetUsersResponse> = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        errors: result.errors || "Failed to fetch users",
      };
    }

    return result;
  } catch (error) {
    console.error("Get users error:", error);
    return {
      success: false,
      data: null,
      errors: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const UserService = { updateProfile, getAllUsers };
