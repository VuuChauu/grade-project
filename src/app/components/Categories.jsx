"use client";
import { useState } from "react";
import styles from "./Categories.module.css";

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const categories = [
    { name: "Tuần 1", exercises: ["Bài 1", "Bài 2", "Bài 3"] },
    { name: "Tuần 2", exercises: ["Bài 1", "Bài 2", "Bài 3", "Bài 4"] },
    { name: "Tuần 3", exercises: ["Bài 1", "Bài 2"] },
    { name: "Tuần 4", exercises: ["Bài 1", "Bài 2", "Bài 3"] },
    { name: "Tuần 5", exercises: ["Bài 1", "Bài 2", "Bài 3"] },
    { name: "Tuần 6", exercises: ["Bài 1", "Bài 2", "Bài 3"] },
  ];

  const exerciseDetails = {
    "Tuần 1": {
      "Bài 1": { title: "Bài 1: In Hello World", content: "Viết chương trình in ra 'Hello World'." },
      "Bài 2": { title: "Bài 2: Tổng hai số", content: "Nhập 2 số nguyên và in tổng của chúng." },
      "Bài 3": { title: "Bài 3: Kiểm tra chẵn lẻ", content: "Nhập số n, kiểm tra n là chẵn hay lẻ." },
    },
    "Tuần 2": {
      "Bài 1": { title: "Bài 1: Giai thừa", content: "Tính giai thừa của n." },
      "Bài 2": { title: "Bài 2: Đảo chuỗi", content: "Nhập chuỗi và in chuỗi đảo ngược." },
      "Bài 3": { title: "Bài 3: Tìm max", content: "Nhập mảng và in phần tử lớn nhất." },
      "Bài 4": { title: "Bài 4: Sắp xếp nổi bọt", content: "Cài đặt thuật toán bubble sort." },
    },
    "Tuần 3": {
      "Bài 1": { title: "Bài 1: Đếm số nguyên tố", content: "Đếm số nguyên tố từ 1 đến n." },
      "Bài 2": { title: "Bài 2: Tính tổng mảng", content: "Nhập mảng và tính tổng các phần tử." },
    },
    "Tuần 4": {
      "Bài 1": { title: "Bài 1: Đệ quy cơ bản", content: "Viết hàm đệ quy tính tổng từ 1 đến n." },
      "Bài 2": { title: "Bài 2: Mảng đảo ngược", content: "Đảo ngược mảng mà không dùng hàm có sẵn." },
      "Bài 3": { title: "Bài 3: Sắp xếp chèn", content: "Cài đặt thuật toán insertion sort." },
    },
    "Tuần 5": {
      "Bài 1": { title: "Bài 1: Đệ quy cơ bản", content: "Viết hàm đệ quy tính tổng từ 1 đến n." },
      "Bài 2": { title: "Bài 2: Mảng đảo ngược", content: "Đảo ngược mảng mà không dùng hàm có sẵn." },
      "Bài 3": { title: "Bài 3: Sắp xếp chèn", content: "Cài đặt thuật toán insertion sort." },
    },
    "Tuần 6": {
      "Bài 1": { title: "Bài 1: Đệ quy cơ bản", content: "Viết hàm đệ quy tính tổng từ 1 đến n." },
      "Bài 2": { title: "Bài 2: Mảng đảo ngược", content: "Đảo ngược mảng mà không dùng hàm có sẵn." },
      "Bài 3": { title: "Bài 3: Sắp xếp chèn", content: "Cài đặt thuật toán insertion sort." },
    },
  };

  const handleExerciseClick = (categoryName, exerciseName) => {
    setSelectedCategory(categoryName);
    setSelectedExercise(exerciseName);
    setCode("");
    setOutput("");
  };

  const handleRunCode = () => {
    if (!code.trim()) {
      setOutput("⚠️ Vui lòng nhập code trước khi chạy!");
      return;
    }
    setOutput("✅ Code đã chạy thành công!\n\n" + code);
  };

  const handleSubmitCode = () => {
    if (!code.trim()) {
      alert("❌ Bạn chưa nhập code!");
      return;
    }
    alert("🎉 Nộp bài thành công!");
  };

  return (
    <div className={styles.mainLayout}>
      {/* Cột bên trái */}
      <div className={styles.leftPane}>
        <h2 className={styles.title}>BÀI TẬP C++</h2>
        <ul className={styles.categoryList}>
          {categories.map((cat) => (
            <li
              key={cat.name}
              className={`${styles.categoryItem} ${selectedCategory === cat.name ? styles.active : ""}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <span className={styles.categoryName}>{cat.name}</span>
              <ul className={styles.exerciseList}>
                {cat.exercises.map((ex) => (
                  <li
                    key={ex}
                    className={`${styles.exerciseItem} ${
                      selectedExercise === ex && selectedCategory === cat.name
                        ? styles.exerciseActive
                        : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExerciseClick(cat.name, ex);
                    }}
                  >
                    {ex}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Cột bên phải */}
      <div className={styles.rightPane}>
        {exerciseDetails[selectedCategory]?.[selectedExercise] ? (
          <div className={styles.exerciseDetail}>
            <h2>
              {selectedCategory} - {exerciseDetails[selectedCategory][selectedExercise].title}
            </h2>
            <p>{exerciseDetails[selectedCategory][selectedExercise].content}</p>

            <div className={styles.actionButtons}>
              <button>Xem file input.txt</button>
              <button>Upload file Output</button>
            </div>


            {/* nhập code */}
            <div className={styles.codeSection}>
              <textarea
                className={styles.codeEditor}
                placeholder="// Nhập code tại đây..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <div className={styles.codeButtons}>
                <button onClick={handleRunCode}> Chạy code</button>
                <button onClick={handleSubmitCode}> Nộp bài</button>
              </div>

              {/* Kết quả */}
              {output && <pre className={styles.outputBox}>{output}</pre>}
            </div>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <p>🧠 Chọn một bài tập để xem chi tiết</p>
          </div>
        )}
      </div>
    </div>
  );
}
