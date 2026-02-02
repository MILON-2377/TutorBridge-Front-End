import { TutorBioInput } from "@/src/components/onboarding/onboarding.validation";
import { UserRoleType } from "@/src/lib/constants";
import { cookies } from "next/headers";

export interface CreateTutor {
  role: UserRoleType;
  category: {
    id: string;
  };
  tutorDetails: TutorBioInput;
}

const createTutor = async (data: CreateTutor) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
    if (!cookieHeader) {
      return {
        success: false,
        message: "Unauthorized: No session cookie",
      };
    }

    const response = await fetch(`${process.env.AUTH_BASE_URL}/tutors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "Failed to create tutor",
        errors: result?.errors,
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Tutor creation failed:", error);

    return {
      success: false,
      message: "Internal server error",
    };
  }
};

export const TutorService = {
  createTutor,
};
