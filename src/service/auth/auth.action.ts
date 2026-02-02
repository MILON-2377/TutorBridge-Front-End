"use server";

import { AuthService } from "./auth.service";

/**
 * Get User Session Action
 */
export const getSessionAction = async () => {
  return await AuthService.getSession();
};

/**
 * User Logged Out Action
 */
export const signOutAction = async () => {
  return await AuthService.signOut();
};
