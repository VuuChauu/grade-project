import "./globals.css";
import Navbar from "./components/Navbar";
import type { ReactNode } from "react";

export const metadata = {
  title: "Toph Clone",
  description: "Navbar giống Toph - Next.js + CSS thuần",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#101112", color: "white" }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
