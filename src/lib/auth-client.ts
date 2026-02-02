"use client"

import { createAuthClient } from "better-auth/client";




const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL!,
  credentials: "include", 
});


export default authClient;