// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodeGrader",
  description: "Nền tảng học lập trình và chấm bài tự động",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#fff",
          fontFamily: "Calibri, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
