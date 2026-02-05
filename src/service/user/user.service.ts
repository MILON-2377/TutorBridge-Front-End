import { ApiResponse } from "@/src/types/response.types";
import { User } from "../auth/auth.service";
import { cookies } from "next/headers";
import { ProfileInput } from "@/src/components/student/student.validation";

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

    const response = await fetch(
      `${process.env.AUTH_BASE_URL}/users/profile`,
      {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json", 
          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );

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


export const UserService = { updateProfile };
