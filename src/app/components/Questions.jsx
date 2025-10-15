"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import styles from "./Question.module.css";

export default function Question() {
  const [time, setTime] = useState(45);
  const [selected, setSelected] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [progress, setProgress] = useState(1);
  const [gameOver, setGameOver] = useState(false);
    const router = useRouter(); 


  const questions = [
    {
      text: "Câu lệnh nào sau đây dùng để in dữ liệu ra màn hình trong C++?",
      options: ["print()", "cout <<", "echo()", "Console.Write()"],
      correct: 1,
    },
    {
      text: "Khai báo biến kiểu nguyên trong C++ đúng là?",
      options: ["number = int;", "int number;", "var number;", "integer number;"],
      correct: 1,
    },
    {
      text: "Ký hiệu nào được dùng để khai báo hằng số trong C++?",
      options: ["const", "define", "static", "fixed"],
      correct: 0,
    },
    {
      text: "Thư viện nào thường được sử dụng để nhập xuất dữ liệu trong C++?",
      options: ["#include <stdio.h>", "#include <iostream>", "#include <fstream>", "#include <string>"],
      correct: 1,
    },
    {
      text: "Câu lệnh nào dưới đây là chú thích hợp lệ trong C++?",
      options: ["// Đây là chú thích", "/* Đây là chú thích */", "## Đây là chú thích", "Cả A và B đều đúng"],
      correct: 3,
    },
    {
      text: "Từ khóa nào dùng để định nghĩa lớp trong C++?",
      options: ["object", "class", "struct", "define"],
      correct: 1,
    },
    {
      text: "Phép toán nào sau đây dùng để truy cập thành viên của lớp thông qua con trỏ?",
      options: [".", "->", "::", ":"],
      correct: 1,
    },
    {
      text: "Kiểu dữ liệu nào dùng để lưu ký tự trong C++?",
      options: ["string", "char", "text", "character"],
      correct: 1,
    },
    {
      text: "Hàm main() trong C++ có kiểu trả về mặc định là gì?",
      options: ["void", "int", "float", "auto"],
      correct: 1,
    },
    {
      text: "Toán tử nào dùng để cấp phát bộ nhớ động trong C++?",
      options: ["alloc", "malloc", "new", "create"],
      correct: 2,
    },
  ];

  const current = questions[questionIndex];


  useEffect(() => {
    if (gameOver) return;

    if (time > 0) {
      const timer = setTimeout(() => setTime((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSkip(true); 
    }
  }, [time, gameOver]);

  const handleSelect = (i) => setSelected(i);


  const handleNext = () => {
    if (gameOver) return;

    if (selected === current.correct) {
      setScore((s) => s + 10);
      setProgress((p) => p + 1);
    } else {
      setLives((l) => l - 1);
    }
    nextQuestion();
  };


  const handleSkip = (isTimeout = false) => {
    if (gameOver) return;
    setLives((l) => l - 1);
    nextQuestion();
  };


  const nextQuestion = () => {
    if (lives - 1 <= 0 && selected !== current.correct) {
      setGameOver(true);
      return;
    }
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((q) => q + 1);
      setSelected(null);
      setTime(45);
    } else {
      setGameOver(true);
    }
  };


   if (gameOver) {
    return (
      <div className={styles.page}>
        <div className={styles.questionCard} style={{ textAlign: "center", color:"#000"}}>
          <h2>💀 Hết lượt chơi!</h2>
          <p style={{ fontSize: "1.2rem", marginTop: 10 }}>Điểm của bạn: <strong>{score}</strong></p>
          <button
            className={styles.next}
            onClick={() => {
              setGameOver(false);
              setScore(0);
              setLives(3);
              setProgress(1);
              setQuestionIndex(0);
              setTime(45);
              setSelected(null);
            }}
            style={{ marginTop: "20px" }}
          >
            🔁 Chơi lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
   
   
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => router.push("/")}>
          ←
        </button>
        <h2>Câu hỏi {questionIndex + 1}</h2>
      </div>

      <div className={styles.main}>

        <div className={styles.quizSection}>
          <div className={styles.progressInfo}>
            <p>Câu {questionIndex + 1} / {questions.length}</p>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${((progress - 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.points}>10 điểm / câu</span>
              <span className={styles.timer}>⏱ {time}s</span>
              <span className={styles.difficulty}>Trung bình</span>
            </div>

            <p className={styles.questionText}>{current.text}</p>

            <div className={styles.options}>
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  className={`${styles.option} ${
                    selected === i ? styles.selected : ""
                  }`}
                  onClick={() => handleSelect(i)}
                >
                  <strong>{String.fromCharCode(65 + i)}.</strong> {opt}
                </button>
              ))}
            </div>

            <div className={styles.actions}>
              <button className={styles.skip} onClick={() => handleSkip(false)}>
                ⏭ Bỏ qua
              </button>
              <button className={styles.next} onClick={handleNext}>
                Câu tiếp theo →
              </button>
            </div>
          </div>
        </div>

        <div className={styles.stats}>
          <h3>Thống kê</h3>
          <div className={styles.statBox}>
            <p>Điểm</p>
            <span>{score}</span>
          </div>
          <div className={styles.statBox}>
            <p>Mạng</p>
            <span className={styles.hearts}>
              {"❤️".repeat(lives) + "🖤".repeat(3 - lives)}
            </span>
          </div>
          <div className={styles.statBox}>
            <p>Tiến trình</p>
            <span>{progress - 1} / {questions.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
