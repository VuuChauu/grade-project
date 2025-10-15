"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter(); 
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student", 
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleRoleChange = (role: string) => {
    setForm({ ...form, role });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    //  lưu thông tin tài khoản vào localStorage
    localStorage.setItem("user", JSON.stringify(form));

    alert("Đăng ký thành công! Bây giờ bạn có thể đăng nhập.");
    router.push("/login");
  };
  return (
    <div style={styles.wrapper}>
    
      <div style={styles.leftPane}>
        <div style={styles.gridBackground}></div>
        <h1 style={styles.logo}>CodeGrader</h1>
      </div>

    
      <div style={styles.rightPane}>
        <div style={styles.card}>
          <h2 style={styles.title}>Đăng ký tài khoản</h2>
          <p style={styles.subtitle}>
            Chọn loại tài khoản của bạn và bắt đầu hành trình cùng chúng tôi
          </p>

    
          <div style={styles.roleContainer}>
            <div
              style={{
                ...styles.roleCard,
                ...(form.role === "student" ? styles.roleActive : {}),
              }}
              onClick={() => handleRoleChange("student")}
            >
              <span style={styles.roleIcon}>🎓</span>
              <h4 style={styles.roleTitle}>Student</h4>
              <p style={styles.roleDesc}>
                Làm bài kiểm tra và theo dõi tiến trình của bạn
              </p>
            </div>

            <div
              style={{
                ...styles.roleCard,
                ...(form.role === "teacher" ? styles.roleActive : {}),
              }}
              onClick={() => handleRoleChange("teacher")}
            >
              <span style={styles.roleIcon}>👩‍🏫</span>
              <h4 style={styles.roleTitle}>Teacher</h4>
              <p style={styles.roleDesc}>Tạo câu đố và quản lý học sinh</p>
            </div>
          </div>

         
          <div style={styles.AndDivider}>
            <div style={styles.line}></div>
            <span style={styles.AndText}>AND</span>
            <div style={styles.line}></div>
          </div>


          {/* FORM */}
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.row}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Họ tên</label>
                <input
                  style={styles.input}
                  placeholder="Nguyễn Văn A"
                  value={form.fullName}
                  onChange={(e) => handleChange(e, "fullName")}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Tên tài khoản</label>
                <input
                  style={styles.input}
                  placeholder="NguyenVanA"
                  value={form.username}
                  onChange={(e) => handleChange(e, "username")}
                />
              </div>
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

            <div>
              <label style={styles.label}>Xác nhận mật khẩu</label>
              <input
                type="password"
                style={styles.input}
                placeholder="********"
                value={form.confirmPassword}
                onChange={(e) => handleChange(e, "confirmPassword")}
              />
            </div>

            <button type="submit" style={styles.button}>
              Đăng ký
            </button>
          </form>

          <p style={styles.footer}>
            Bạn đã có tài khoản?{" "}
            <a href="/login" style={styles.link}>
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

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
    width: "400px",
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
    marginBottom: "25px",
  },
  roleContainer: {
    display: "flex",
    gap: "14px",
    marginBottom: "24px",
  },
  roleCard: {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "16px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#fafafa",
    transition: "all 0.2s ease",
  },
  roleActive: {
    border: "1px solid #a855f7",
    backgroundColor: "#f3e8ff",
  },
  roleIcon: {
    fontSize: "28px",
  },
  roleTitle: {
    fontSize: "15px",
    fontWeight: 600,
    marginTop: "6px",
  },
  roleDesc: {
    fontSize: "13px",
    color: "#666",
    marginTop: "4px",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #e0e0e0",
    marginTop: "16px",
    marginBottom: "10px",
  },
  or: {
    textAlign: "center",
    color: "#999",
    fontSize: "13px",
    marginBottom: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  row: {
    display: "flex",
    gap: "10px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 500,
    marginBottom: "4px",
    display: "block",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    fontSize: "14px",
    outline: "none",
    color: "#000",
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
  footer: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#666",
  },
  link: {
    color: "#7c3aed",
    textDecoration: "none",
  },

  AndDivider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    margin: "20px 0",
  },
  line: {
    flex: 1,
    height: "1px",
    backgroundColor: "#e0e0e0",
  },
  AndText: {
    fontSize: "13px",
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  };
