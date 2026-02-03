import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "./service/auth/auth.service";
import { UserRole, UserRoleType } from "./lib/constants";

export async function proxy(req: NextRequest) {
  const session = await AuthService.getSession();

  const role = session?.role?.toUpperCase() as UserRoleType;

  if (!role) {
    return NextResponse.redirect(new URL("sign-in", req.url));
  }

  const allowedRoles = [UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR];

  if (!allowedRoles.includes(role as UserRoleType)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
