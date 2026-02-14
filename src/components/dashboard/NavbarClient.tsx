"use client";

import dynamic from "next/dynamic";

const NavbarWithAuth = dynamic(
  () => import("@/src/components/dashboard/NavbarWithAuth"),
  { ssr: false }
);

export function NavbarClient() {
  return <NavbarWithAuth />;
}