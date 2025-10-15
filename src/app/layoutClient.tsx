"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const hideNavbar = pathname === "/login" || pathname === "/register";

  return (
    <html lang="vi">
      <body>
        {!hideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
