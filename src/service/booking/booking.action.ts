"use server";

import {
  BookingService,
  CreateBookingPayload,
  StudentBookingParams,
} from "./booking.service";

// Create Booking Action
export const createBookingAction = async (payload: CreateBookingPayload) => {
  return await BookingService.createBooking(payload);
};

// Get Student Bookings Action
export const getStudentBookings = async (type: StudentBookingParams) => {
  return await BookingService.getBookingsStudentId(type);
};
