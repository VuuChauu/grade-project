"use client";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [query, setQuery] = useState("");

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        {/* Logo + Menu */}
        <div className={styles.left}>
          <div className={styles.logo}>
            {/* Nếu không có logo.svg, có thể bỏ <Image> và chỉ để chữ */}
            <span className={styles.brand}>Toph</span>
          </div>

          <ul className={styles.menu}>
            <li>Contests</li>
            <li className={styles.active}>Problems</li>
            <li>Leaderboard</li>
            <li>Tutorials</li>
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

          <span className={styles.icon}>⛶</span>
          <span className={styles.icon}>🔔</span>

          <div className={styles.avatar}>C</div>
        </div>
      </nav>
    </div>
  );
}