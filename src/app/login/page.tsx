"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (savedUser.username === username && savedUser.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      router.push("/");
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Đăng nhập</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Đăng nhập
          </button>
        </form>
        <p style={styles.footer}>
          Chưa có tài khoản?{" "}
          <a href="/register" style={styles.link}>
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background:
      "radial-gradient(circle at 20% 20%, #1e1f22, #0c0c0c 80%)",
    color: "white",
  },
  card: {
    backgroundColor: "rgba(25, 25, 25, 0.95)",
    border: "1px solid #333",
    borderRadius: "16px",
    padding: "40px 50px",
    boxShadow: "0 0 20px rgba(0,0,0,0.6)",
    width: "320px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#4da3ff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #444",
    backgroundColor: "#1a1a1a",
    color: "white",
    outline: "none",
    fontSize: "14px",
    transition: "border-color 0.2s",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    backgroundColor: "#4da3ff",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    transition: "background-color 0.2s",
  },
  link: {
    color: "#4da3ff",
    textDecoration: "none",
  },
  footer: {
    marginTop: "18px",
    fontSize: "14px",
    color: "#ccc",
  },

};
