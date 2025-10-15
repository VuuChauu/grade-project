"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Categories from "./components/Categories";

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // ✅ đảm bảo chỉ chạy trên client

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.replace("/login"); // 👈 điều hướng nếu chưa đăng nhập
    }
  }, [router]);

  if (!isClient) {
    return null; // 👈 tránh lỗi khi đang render server
  }

  // ✅ Chỉ hiển thị nội dung khi người dùng đã đăng nhập
  if (!localStorage.getItem("isLoggedIn")) {
    return null;
  }

  return (
    <div>
      <Categories />
    </div>
  );
}
