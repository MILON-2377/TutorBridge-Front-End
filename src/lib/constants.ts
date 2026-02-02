
export const UserRole = {
  STUDENT: "STUDENT",
  TUTOR: "TUTOR",
  ADMIN: "ADMIN", 
} as const;


export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];