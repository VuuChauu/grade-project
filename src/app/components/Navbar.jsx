"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState("");
  const menuRef = useRef(null);
  const router = useRouter();

  // 🔹 Lấy tên người dùng từ localStorage khi component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  // 🔹 Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Xử lý đăng xuất
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      sessionStorage.removeItem("isLoggedIn");
    }
    router.push("/login");
    router.refresh();
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        {/* Logo + Menu */}
        <div className={styles.left}>
          <div className={styles.logo}>
            <span className={styles.brand}>Lớp học</span>
          </div>

          <ul className={styles.menu}>
            <li>Bài học</li>
            <li className={styles.active}>Bài tập</li>
            <li>Danh sách lớp</li>
            <li></li>
          </ul>
        </div>

        {/* Search + Icons + Avatar */}
        <div className={styles.right}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search Problems"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <span className={styles.icon}>🔔</span>

          {/* Avatar / Menu tài khoản */}
          <div className={styles.avatarWrapper} ref={menuRef}>
            <div
              className={styles.avatarIcon}
              onClick={() => setShowMenu(!showMenu)}
            >
              👤
            </div>

            {showMenu && (
              <div className={styles.dropdown}>
                <p className={styles.username}>👋{username || "User"}</p>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
