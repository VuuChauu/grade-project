import "./globals.css";
import type { ReactNode } from "react";
import LayoutClient from "./layoutClient";

export const metadata = {
  title: "Toph Clone",
  description: "Trang luyện tập C++ bằng Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, backgroundColor: "#101112", color: "white" }}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
