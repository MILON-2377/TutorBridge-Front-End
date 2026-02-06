"use server";

import {
  BookingService,
  BookingStatusPayload,
  CreateBookingPayload,
  StudentBookingParams,
} from "./booking.service";
import { ReviewInput } from "./booking.validation";

// Create Booking Action
export const createBookingAction = async (payload: CreateBookingPayload) => {
  return await BookingService.createBooking(payload);
};

// Get Student Bookings Action
export const getStudentBookings = async (type: StudentBookingParams) => {
  return await BookingService.getBookingsStudentId(type);
};

// Update Booking status action
export const updateBookingStatus = async (
  bookingId: string,
  payload: BookingStatusPayload,
) => {
  return await BookingService.updateBookingStatus(bookingId, payload);
};

// Give Review on session
export const createReviewAction = async (
  bookingId: string,
  payload: ReviewInput,
) => {
  return await BookingService.createReview(bookingId, payload);
};
