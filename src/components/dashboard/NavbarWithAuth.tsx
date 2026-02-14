"use client"

import { useEffect, useState } from "react";
import { Navbar } from "../shared/Navbar";
import { getSessionAction } from "@/src/service/auth/auth.action";
import { User } from "@/src/service/auth/auth.service";

export default function NavbarWithAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSessionAction();
      if (session.success) {
        setUser(session.data);
      }
    };

    fetchSession();
  }, []);

  return <Navbar user={user} />;
}
