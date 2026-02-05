export const UserRole = {
  STUDENT: "STUDENT",
  TUTOR: "TUTOR",
  ADMIN: "ADMIN",
} as const;

export const BookingStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;


export const DayOfWeek = {
  SUNDAY: "SUNDAY",
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
} as const;


export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
export type BookingStatusType =
  (typeof BookingStatus)[keyof typeof BookingStatus];
export type DayOfWeekType = (typeof DayOfWeek)[keyof typeof DayOfWeek];