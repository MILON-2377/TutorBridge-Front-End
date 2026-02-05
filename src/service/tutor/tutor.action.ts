"use server";
import { AvailabilityPayload } from "@/src/components/tutor/tutor.validation";
import { CreateTutor, GetTutorsParams, TutorService } from "./tutor.service";

// Create tutor action
export const createTutorAction = async (data: CreateTutor) => {
  return await TutorService.createTutor(data);
};

// Create Availability Rule Action
export const createAvailabilityAction = async (data: AvailabilityPayload) => {
  return await TutorService.createAvailabilityRule(data);
};

// Delete Availability Action
export const deleteAvailabilityAction = async (id: string) => {
  return await TutorService.deleteAvailability(id);
};

// Update Availability Action
export const updateAvailabilityAction = async (
  ruleId: string,
  data: Partial<AvailabilityPayload>,
) => {
  return await TutorService.updateAvailabilityRule(ruleId, data);
};

// Get Tutors Action
export const getTutorsAction = async (params: GetTutorsParams) => {
  return await TutorService.getTutors(params);
};
