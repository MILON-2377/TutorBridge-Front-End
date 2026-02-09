import { BookingStatusType } from "@/src/lib/constants";
import { ApiResponse } from "@/src/types/response.types";
import { cookies } from "next/headers";
import { AvailabilitySlot, Tutor } from "../tutor/tutor.service";
import { ReviewInput } from "./booking.validation";
import { User } from "@/src/providers/auth/AuthContext";

// Create Booking
export interface CreateBookingPayload {
  tutorId: string;
  availabilitySlotId: string;
  price: number;
}

export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  availabilitySlotId: string;
  price: number;
  status: BookingStatusType;
  createdAt: string;
  updatedAt: string;
}

const createBooking = async (
  payload: CreateBookingPayload,
): Promise<ApiResponse<Booking>> => {
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

    const response = await fetch(`${process.env.AUTH_BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result: ApiResponse<Booking> = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        errors: result.message || "Failed to create booking",
      };
    }

    return result;
  } catch (error) {
    console.error("Tutor booking error:", error);

    return {
      success: false,
      data: null,
      errors: error instanceof Error ? error.message : "Unknown booking error",
    };
  }
};

// Get Bookings By StudentId

export interface StudentBooking {
  id: string;
  availabilitySlot: AvailabilitySlot;
  price: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  studentId: string;
  tutor: Tutor;
  createdAt: string;
  updatedAt: string;
}

export interface StudentBookingParams {
  type: "upcoming" | "past" | "all";
}

const getBookingsStudentId = async (
  type: StudentBookingParams,
): Promise<ApiResponse<StudentBooking[]>> => {
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
      `${process.env.AUTH_BASE_URL}/bookings/student?${type}`,
      {
        method: "GET",
        headers: {
          cookie: cookieHeader,
        },
        cache: "no-store",
        next: {
          tags: ["student-bookings"],
        },
      },
    );

    if (!response.ok) {
      return {
        success: false,
        data: null,
        errors: `Failed to fetch student bookings data (${response.status})`,
      };
    }

    const result: ApiResponse<StudentBooking[]> = await response.json();

    return {
      success: true,
      data: result?.data ?? null,
      errors: null,
    };
  } catch (error) {
    console.log("Get student bookings error", error);
    return {
      success: false,
      data: null,
      errors: "Unexpected server error",
    };
  }
};

export interface SessionType extends Booking {
  student: User;
}

const getSessionsByTutorId = async (): Promise<ApiResponse<SessionType>> => {
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
      `${process.env.AUTH_BASE_URL}/bookings/sessions/tutor`,
      {
        method: "GET",
        headers: {
          cookie: cookieHeader,
        },
        cache: "no-store",
        next: {
          tags: ["sessions"],
        },
      },
    );

    if (!response.ok) {
      return {
        success: false,
        data: null,
        errors: `Failed to fetch sessions data (${response.status})`,
      };
    }

    const result: ApiResponse<SessionType[]> = await response.json();

    return {
      success: true,
      data: result?.data ?? [],
      errors: null,
    };
  } catch (error) {
    console.log("Get student sessions error", error);
    return {
      success: false,
      data: [],
      errors: "Unexpected server error",
    };
  }
};

export interface BookingStatusPayload {
  status: BookingStatusType;
}

const updateBookingStatus = async (
  bookingId: string,
  payload: BookingStatusPayload,
): Promise<ApiResponse<Booking>> => {
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
      `${process.env.AUTH_BASE_URL}/bookings/status/${bookingId}`,
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
        errors: result?.message || "Failed to update booking status",
      };
    }

    return {
      success: true,
      data: result.data,
      errors: null,
    };
  } catch (error) {
    console.error("Update booking status error:", error);
    return {
      success: false,
      data: null,
      errors: "Unexpected server error",
    };
  }
};

// Give review
const createReview = async (
  bookingId: string,
  payload: ReviewInput,
): Promise<ApiResponse<Booking>> => {
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
      `${process.env.AUTH_BASE_URL}/reviews/${bookingId}`,
      {
        method: "POST",
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
        errors: result?.message || "Failed to set review on session",
      };
    }

    return {
      success: true,
      data: result.data,
      errors: null,
    };
  } catch (error) {
    console.error("Give review on session error:", error);
    return {
      success: false,
      data: null,
      errors: "Unexpected server error",
    };
  }
};

export const BookingService = {
  createBooking,
  getBookingsStudentId,
  updateBookingStatus,
  createReview,
  getSessionsByTutorId,
};
