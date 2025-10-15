"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>
        <span className={styles.logoIcon}>🔗</span> <span>CodeGrader</span>
      </h2>

      <div className={styles.searchBox}>
        <input type="text" placeholder="Search" />
      </div>

      <nav className={styles.nav}>
        <p className={styles.section}>Main</p>
        <a href="#" className={styles.navItem}>
          📊 Dashboard
        </a>
        <a href="#" className={`${styles.navItem} ${styles.active}`}>
          📘 Classes
        </a>
        <a href="#" className={styles.navItem}>
          👥 Students
        </a>

        <p className={styles.section}>Manage</p>
        <a href="#" className={styles.navItem}>
          ⚙️ Settings
        </a>
      </nav>

      {/* 👇 Nút đăng xuất cố định ở cuối sidebar */}
      <button onClick={handleLogout} className={styles.logoutBtn}>
        Đăng xuất
      </button>
    </aside>
  );
}
