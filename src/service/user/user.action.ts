"use server"

import { ProfileInput } from "@/src/components/student/student.validation";
import { UserService } from "./user.service";

// Profile Update Action
export const profileUpdateAction = async (payload: ProfileInput) => {
  return await UserService.updateProfile(payload);
};
