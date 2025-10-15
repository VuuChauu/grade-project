"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Categories from "./components/Categories";
import Questions from "./components/Questions";

export default function HomePage() {
  const router = useRouter();
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const isQuestionView = params.get("view") === "question";

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#fff",
          fontFamily: "Calibri, sans-serif",
        }}
      >
        Đang tải...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        fontFamily: "Calibri, sans-serif",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, padding: "24px" }}>
        {!isQuestionView ? (
          <Categories onViewClick={() => router.push("?view=question")} />
        ) : (
          <Questions />
        )}
      </div>
    </div>
  );
}
