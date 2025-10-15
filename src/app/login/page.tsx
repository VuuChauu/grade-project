"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter(); 
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      alert("Không tìm thấy tài khoản, vui lòng đăng ký trước!");
      return;
    }

    const user = JSON.parse(savedUser);

    if (
      user.username === form.username &&
      user.email === form.email &&
      user.password === form.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Đăng nhập thành công!");
      router.push("/"); 
    } else {
      alert("Thông tin đăng nhập không chính xác!");
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* LEFT SIDE */}
      <div style={styles.leftPane}>
        <div style={styles.gridBackground}></div>
        <h1 style={styles.logo}>CodeGrader</h1>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.rightPane}>
        <div style={styles.card}>
          <h2 style={styles.title}>Welcome</h2>
          <p style={styles.subtitle}>
            Đăng nhập vào CodeGrader
          </p>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div>
              <label style={styles.label}>Tên tài khoản</label>
              <input
                style={styles.input}
                placeholder="NguyenVanA"
                value={form.username}
                onChange={(e) => handleChange(e, "username")}
              />
            </div>

            <div>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                style={styles.input}
                placeholder="name@gmail.com"
                value={form.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </div>

            <div>
              <label style={styles.label}>Mật khẩu</label>
              <input
                type="password"
                style={styles.input}
                placeholder="********"
                value={form.password}
                onChange={(e) => handleChange(e, "password")}
              />
            </div>

            <button type="submit" style={styles.button}>
              Đăng nhập
            </button>
          </form>

          <p style={styles.footer}>
            Bạn chưa có tài khoản?{" "}
            <a href="/register" style={styles.link}>
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// 🎨 Inline CSS styles
const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#000",
    color: "white",
    fontFamily: "Calibri, sans-serif", 
  },
  leftPane: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  gridBackground: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(100,0,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    backgroundColor: "#111",
  },
  logo: {
    fontSize: "48px",
    fontWeight: "bold",
    background:
      "linear-gradient(90deg, #3b82f6, #a855f7, #ef4444)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    zIndex: 1,
  },
  rightPane: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    color: "#000",
  },
  card: {
    width: "340px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "6px",
  },
  subtitle: {
    color: "#666",
    fontSize: "14px",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  label: {
    fontSize: "15px",
    fontWeight: 500,
    marginBottom: "4px",
    display: "block",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    color: "#000",
    fontWeight: "500",
    width: "100%",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    backgroundColor: "#7c3aed",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    transition: "background-color 0.2s",
  },
  link: {
    color: "#7c3aed",
    textDecoration: "none",
  },
  footer: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#666",
  },
};
