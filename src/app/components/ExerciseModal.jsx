"use client";
import { useState, useEffect } from "react";
import styles from "./ExerciseModal.module.css";

export default function ExerciseModal({ isOpen, onClose, category, exercise, exerciseDetails }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (isOpen && category && exercise) {
      setContent(exerciseDetails[category][exercise] || {
        title: `${exercise} - ${category}`,
        content: `Nội dung chi tiết cho ${exercise} của ${category} chưa được định nghĩa. Hãy viết một chương trình C++ để giải quyết bài tập này.`,
      });
    }
  }, [isOpen, category, exercise]);

  if (!isOpen || !content) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{content.title}</h2>
        <p>{content.content}</p>
        <button className={styles.closeButton} onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
}