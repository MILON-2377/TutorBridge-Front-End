"use client";

import authClient from "@/src/lib/auth-client";
import { SignUpInput } from "../signUpSchema";

export default class SignUpService {
  public static signUp = async (formData: SignUpInput) => {
    const { error } = await authClient.signUp.email(formData);

    if (error) {
      return {
        error: error.message,
      };
    }

    return { success: true };
  };
}
