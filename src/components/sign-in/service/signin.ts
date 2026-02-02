"use client";

import authClient from "@/src/lib/auth-client";
import { SignInInput } from "../sign-in.validation";

export const signIn = async (formData: SignInInput) => {
  const { error } = await authClient.signIn.email(formData);

  if (error) {
    return {
      error: error.message,
    };
  }

  return { success: true };
};
