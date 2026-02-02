"use server"
import { SignUpInput } from "../signUpSchema";
import SignUpService from "./sign-up.service";

export async function signUpAction(data: SignUpInput) {
  return await SignUpService.signUp(data);
}
