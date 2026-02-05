import { BookingStatusType } from "@/src/lib/constants";
import { ApiResponse } from "@/src/types/response.types";
import { cookies } from "next/headers";
import { AvailabilitySlot, Tutor } from "../tutor/tutor.service";

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
  status: "PENDING" | "BOOKED";
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

export const BookingService = {
  createBooking,
  getBookingsStudentId,
};
