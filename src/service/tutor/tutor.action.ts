"use server";
import { AvailabilityInput } from "@/src/components/tutor/tutor.validation";
import { CreateTutor, TutorService } from "./tutor.service";

// Create tutor action
export const createTutorAction = async (data: CreateTutor) => {
  return await TutorService.createTutor(data);
};

// Create Availability Rule
export const createAvailabilityAction = async (data: AvailabilityInput) => {
  return await TutorService.createAvailabilityRule(data);
};
