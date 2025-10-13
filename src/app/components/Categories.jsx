"use client";
import { useState } from "react";
import styles from "./Categories.module.css";

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const categories = [
    { name: "Tuần 1", exercises: ["Bài 1", "Bài 2", "Bài 3"] },
    { name: "Tuần 2", exercises: ["Bài 1", "Bài 2", "Bài 3", "Bài 4"] },
  ];

  const exerciseDetails = {
    "Tuần 1": {
      "Bài 1": { title: "Bài 1 - In Hello World", content: "Viết chương trình in ra 'Hello World'" },
      "Bài 2": { title: "Bài 2 - Tổng hai số", content: "Nhập 2 số nguyên và in tổng của chúng." },
      "Bài 3": { title: "Bài 3 - Kiểm tra chẵn lẻ", content: "Nhập số n, kiểm tra n là chẵn hay lẻ." },
    },
    "Tuần 2": {
      "Bài 1": { title: "Bài 1 - Giai thừa", content: "Tính giai thừa của n." },
      "Bài 2": { title: "Bài 2 - Đảo chuỗi", content: "Nhập chuỗi và in chuỗi đảo ngược." },
      "Bài 3": { title: "Bài 3 - Tìm max", content: "Nhập mảng và in phần tử lớn nhất." },
      "Bài 4": { title: "Bài 4 - Sắp xếp nổi bọt", content: "Cài đặt thuật toán bubble sort." },
    },
  };

  const handleExerciseClick = (categoryName, exerciseName) => {
    // Khi chọn bài → tự động chuyển tuần active theo
    setSelectedCategory(categoryName);
    setSelectedExercise(exerciseName);
  };

  return (
    <div className={styles.mainLayout}>
      {/* Cột bên trái */}
      <div className={styles.leftPane}>
        <h2 className={styles.title}>Categories</h2>
        <ul className={styles.categoryList}>
          {categories.map((cat, i) => (
            <li
              key={i}
              className={`${styles.categoryItem} ${
                selectedCategory === cat.name ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <span className={styles.categoryName}>{cat.name}</span>
              <ul className={styles.exerciseList}>
                {cat.exercises.map((ex, j) => (
                  <li
                    key={j}
                    className={`${styles.exerciseItem} ${
                      selectedExercise === ex && selectedCategory === cat.name
                        ? styles.exerciseActive
                        : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // không lan lên tuần
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
            <h2>{exerciseDetails[selectedCategory][selectedExercise].title}</h2>
            <p>{exerciseDetails[selectedCategory][selectedExercise].content}</p>

            <div className={styles.actionButtons}>
              <button>Tải file input.txt</button>
              <button>Tải file output.txt</button>
              <button>Nộp bài</button>
            </div>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <p>Chọn một bài tập để xem chi tiết</p>
          </div>
        )}
      </div>
    </div>
  );
}
