import { TutorBioInput } from "@/src/components/onboarding/onboarding.validation";
import { AvailabilityInput } from "@/src/components/tutor/tutor.validation";
import { UserRoleType } from "@/src/lib/constants";
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
const getAvailabilities = async () => {
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
        error: "Get availability errors ",
        data: null,
      };
    }
  } catch (error) {
    console.log("Get availabities error", error);
    return {
      success: false,
      error: error,
      data: [],
    };
  }
};

export const TutorService = {
  createTutor,
  createAvailabilityRule,
  getAvailabilities,
};
