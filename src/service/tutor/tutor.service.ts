import { TutorBioInput } from "@/src/components/onboarding/onboarding.validation";
import { DayOfWeekType, UserRoleType } from "@/src/lib/constants";
import { ApiResponse } from "@/src/types/response.types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { User } from "../auth/auth.service";
import { AvailabilityPayload } from "@/src/components/tutor/tutor.validation";

// Get Tutors
export interface Tutor {
  id: string;
  name: string;
  bio?: string;
  subjects: string[];
  hourlyRate: number;
  isActive: boolean;
  user: User;
  createdAt: string;
  updatedAt: string;
  experienceYears: number;
  languages: string[];
  totalReviews: number;
  avgRating: number;
  availabilityRules?: AvailabilityRulesType[];
}

export interface GetTutorsParams {
  page?: number;
  limit?: number;
  search?: string;
  subject?: string;
}

export interface TutorPagination {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface GetTutorResponse {
  data: Tutor[];
  pagination: TutorPagination;
}

const getTutors = async (
  params: GetTutorsParams = {},
): Promise<ApiResponse<GetTutorResponse>> => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (!cookieHeader) {
      return {
        success: false,
        data: {
          data: [],
          pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
        },
        errors: "Unauthorized: No session cookie",
      };
    }

    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.search) query.set("search", params.search);
    if (params.subject) query.set("subject", params.subject);

    const response = await fetch(
      `${process.env.AUTH_BASE_URL}/tutors?${query.toString()}`,
      {
        headers: { cookie: cookieHeader },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return {
        success: false,
        data: {
          data: [],
          pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
        },
        errors: `Failed to fetch tutors (${response.status})`,
      };
    }

    const result: ApiResponse<{ data: Tutor[]; pagination: TutorPagination }> =
      await response.json();

    return {
      success: true,
      data: {
        data: result.data ? result.data.data : [],
        pagination: result.data
          ? result.data.pagination
          : {
              page: 1,
              limit: 10,
              total: 0,
              totalPages: 0,
            },
      },
      errors: null,
    };
  } catch (error) {
    console.error("get tutors error", error);

    const message =
      error instanceof Error ? error.message : "Failed to get tutors";

    return {
      success: false,
      data: {
        data: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      },
      errors: message,
    };
  }
};

// Get Tutor By ID
const getTutorById = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (!cookieHeader) {
      return {
        success: false,
        tutor: null,
        error: "No authentication cookies found",
      };
    }

    const response = await fetch(`${process.env.AUTH_BASE_URL}/tutors/${id}`, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
      next: {
        tags: ["tutor"],
      },
    });

    if (!response.ok) {
      return {
        success: false,
        tutor: null,
        error: `Failed to fetch Tutor (${response.status})`,
      };
    }

    const result: ApiResponse<Tutor> = await response.json();

    return {
      success: true,
      tutor: result?.data ?? null,
      error: null,
    };
  } catch (error) {
    console.log("Get tutor error", error);
    return {
      success: false,
      tutor: null,
      error: "Unexpected server error",
    };
  }
};

// Creat tutor
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

// Create Availability
const createAvailabilityRule = async (data: AvailabilityPayload) => {
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

// Update Availability Rule
const updateAvailabilityRule = async (
  ruleId: string,
  data: Partial<AvailabilityPayload>,
) => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (!cookieHeader) return { success: false, error: "Unauthorized" };

    const response = await fetch(
      `${process.env.AUTH_BASE_URL}/tutors/availability/${ruleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieHeader,
        },
        body: JSON.stringify(data),
        cache: "no-store",
      },
    );

    let result = {};
    try {
      result = await response.json();
    } catch {
      console.error("Non-JSON response:", await response.text());
    }

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to update rule (${response.status})`,
      };
    }

    revalidatePath("/dashboard/schedule");

    return { success: true, data: result };
  } catch (error) {
    console.error("Update availability error", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
  }
};

// Get Availabilities
export interface AvailabilityRulesType {
  id: string;
  availabilitySlots: unknown;
  createdAt: string;
  dayOfWeek: DayOfWeekType;
  endMinute: string;
  startMinute: string;
  isActive: boolean;
  tutorId: string;
  updatedAt: string;
}
const getAvailabilities = async (): Promise<
  ApiResponse<AvailabilityRulesType[]>
> => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (!cookieHeader) {
      return {
        success: false,
        data: [],
        status: 401,
        errors: "No authentication cookies found",
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
        data: [],
        status: response.status,
        errors: `Failed to fetch availability (${response.status})`,
      };
    }

    const result: ApiResponse<AvailabilityRulesType[]> = await response.json();

    return {
      success: true,
      data: result?.data ?? [],
      errors: null,
    };
  } catch (error) {
    console.log("Get availabities error", error);
    return {
      success: false,
      data: [],
      errors: "Unexpected server error",
    };
  }
};

const getAvailabilityById = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (!cookieHeader) {
      return {
        success: false,
        availability: null,
        error: "No authentication cookies found",
      };
    }

    const response = await fetch(
      `${process.env.AUTH_BASE_URL}/tutors/availability/${id}`,
      {
        method: "GET",
        headers: {
          cookie: cookieHeader,
        },
        cache: "no-store",
        next: {
          tags: ["availability"],
        },
      },
    );

    if (!response.ok) {
      return {
        success: false,
        availability: null,
        error: `Failed to fetch availability (${response.status})`,
      };
    }

    const result: ApiResponse<AvailabilityRulesType> = await response.json();

    return {
      success: true,
      availability: result?.data ?? null,
      error: null,
    };
  } catch (error) {
    console.log("Get availabities error", error);
    return {
      success: false,
      availability: null,
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

// Get Availabilities Rules
export interface AvailabilitySlot {
  availabilityRuleId: string;
  id: string;
  date: string;
  startMinute: number;
  endMinute: number;
  status: "AVAILABLE" | "BOOKED" | "CANCELLED";
}

export interface AvailabilityRule {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  availabilitySlots: AvailabilitySlot[];
}

const getAvailabilitySlots = async (
  tutorId: string,
): Promise<ApiResponse<AvailabilitySlot[]>> => {
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
      `${process.env.AUTH_BASE_URL}/tutors/availability/slots/${tutorId}`,
      {
        headers: {
          cookie: cookieHeader,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    const result: ApiResponse<AvailabilitySlot[]> = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        errors: result.errors || "Failed to fetch availability rules",
      };
    }

    return result;
  } catch (error) {
    console.error("Get Availability error:", error);
    return {
      success: false,
      data: null,
      errors: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const TutorService = {
  createTutor,
  getTutors,
  getTutorById,
  createAvailabilityRule,
  getAvailabilities,
  deleteAvailability,
  getAvailabilityById,
  updateAvailabilityRule,
  getAvailabilitySlots,
};
