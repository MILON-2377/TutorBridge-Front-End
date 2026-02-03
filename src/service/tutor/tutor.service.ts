import { TutorBioInput } from "@/src/components/onboarding/onboarding.validation";
import { AvailabilityInput } from "@/src/components/tutor/tutor.validation";
import { UserRoleType } from "@/src/lib/constants";
import { ApiResponse } from "@/src/types/response.types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export interface CreateTutor {
  role: UserRoleType;
  category: {
    id: string;
  };
  tutorDetails: TutorBioInput;
}

// Creat tutor
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

// Create Availability
const createAvailabilityRule = async (data: AvailabilityInput) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (!cookieHeader) {
      console.log("No cookies found");
      return null;
    }

    const response = await fetch(
      `${process.env.AUTH_BASE_URL}/tutors/availability`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieHeader,
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to create rule",
      };
    }

    revalidatePath("/dashboard/schedule");

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.log("create availability error", error);
    return {
      success: false,
      error: error || "Interval server error",
    };
  }
};

// Get Availabilities
export interface AvailabilityRulesType {
  id: string;
  availabilitySlots: unknown;
  createdAt: string;
  dayOfWeek: string;
  endTime: string;
  startTime: string;
  isActive: boolean;
  tutorId: string;
  updatedAt: string;
}
const getAvailabilities = async () => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (!cookieHeader) {
      return {
        success: false,
        availabilities: [],
        error: "No authentication cookies found",
      };
    }

    const response = await fetch(
      `${process.env.AUTH_BASE_URL}/tutors/availability`,
      {
        method: "GET",
        headers: {
          cookie: cookieHeader,
        },
        next: {
          tags: ["availability"],
        },
      },
    );

    if (!response.ok) {
      return {
        success: false,
        availabilities: [],
        error: `Failed to fetch availability (${response.status})`,
      };
    }

    const result: ApiResponse<AvailabilityRulesType[]> = await response.json();

    return {
      success: true,
      availabilities: result?.data ?? [],
      error: null,
    };
  } catch (error) {
    console.log("Get availabities error", error);
    return {
      success: false,
      availabilities: [],
      error: "Unexpected server error",
    };
  }
};

// Delete Availability
const deleteAvailability = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (!cookieHeader) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    console.log("delete availability service running");

    const response = await fetch(
      `${process.env.AUTH_BASE_URL}/tutors/availability/${id}`,
      {
        method: "DELETE",
        headers: {
          cookie: cookieHeader,
        },
        cache: "no-store",
      },
    );
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return {
          success: false,
          error: "Unauthorized",
        };
      }

      return {
        success: true,
        error: `Failed to delete availability (${response.status})`,
      };
    }

    await response.json().catch(() => null);

    revalidatePath("availability");

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Delete availability error", error);
    return {
      success: false,
      error: "SERVER_ERROR",
    };
  }
};

export const TutorService = {
  createTutor,
  createAvailabilityRule,
  getAvailabilities,
  deleteAvailability,
};
