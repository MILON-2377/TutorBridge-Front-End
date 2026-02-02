"use server";
import { CreateTutor, TutorService } from "./tutor.service";

export const createTutorAction = async (data: CreateTutor) => {
  return await TutorService.createTutor(data);
};
