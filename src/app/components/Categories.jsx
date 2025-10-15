"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import styles from "./Categories.module.css";

const classData = [
  { id: 'cpp-basic-1', title: "Tuần 1 - Cơ bản (1)", description: "Cơ bản về C++", status: "Published" },
  { id: 'cpp-basic-2', title: "Tuần 2 - Cơ bản (2)", description: "Cơ bản về C++", status: "Published" },
  { id: 'cpp-advanced', title: "Tuần 3 - Nâng cao", description: "Nâng cao về C++", status: "Draft" },
];

export default function Categories({ onViewClick }) { 
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);
  const [shareModal, setShareModal] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const menuRefs = useRef([]);
  const btnRefs = useRef([]);

  const toggleMenu = (i) => {
    setOpenIndex(prev => (prev === i ? null : i));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedInsideMenuOrBtn =
        menuRefs.current.some((menu) => menu && menu.contains(e.target)) ||
        btnRefs.current.some((btn) => btn && btn.contains(e.target));
      if (!clickedInsideMenuOrBtn) setOpenIndex(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  
  const handleView = (classId) => {
    if (onViewClick) onViewClick(); 
    else router.push(`/classes/${classId}/questions`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Classes</h1>
        <p>Tạo, quản lý và phân tích bài kiểm tra của bạn</p>
        <button className={styles.newClassBtn}>+ Tạo lớp học mới</button>
      </div>

      <div className={styles.library}>
        <div className={styles.libraryHeader}>
          <h2>Class Library</h2>
        </div>

        <div className={styles.filterRow}>
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${styles.active}`}>All Quizzes</button>
            <button className={styles.tab}>Published</button>
            <button className={styles.tab}>Drafts</button>
          </div>

          <div className={styles.searchFilter}>
            <input type="text" placeholder="Tìm kiếm bài kiểm tra" />
            <select>
              <option>Tất cả danh mục</option>
            </select>
          </div>
        </div>

        {classData.map((item, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.icon}>📘</div>
            <div className={styles.cardBody}>
              <div className={styles.cardHeader}>
                <h3>{item.title}</h3>
                <span className={item.status === "Published" ? styles.published : styles.draft}>
                  {item.status}
                </span>
              </div>

              <p>{item.description}</p>

              <div className={styles.meta}>
                <span>📝 10 câu hỏi</span>
                <span>⏱ 45s/ 1 câu</span>
                <span>👥 32 hoàn thành</span>
                <span>Vừa tạo</span>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.viewBtn}
                  onClick={() => handleView(item.id)}
                >
                  View
                </button>

                <button
                  className={styles.moreBtn}
                  ref={(el) => (btnRefs.current[i] = el)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(i);
                  }}
                >
                  ⋮
                </button>

                {openIndex === i && (
                  <div
                    className={styles.moreMenu}
                    ref={(el) => (menuRefs.current[i] = el)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className={styles.menuItem}
                      onClick={() => {
                        setCurrentClass(item);
                        setShareModal(true);
                        setOpenIndex(null);
                      }}
                    >
                      👁 Chia sẻ lớp học
                    </button>
                    <button className={`${styles.menuItem} ${styles.deleteBtn}`}>🗑 Xóa</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {shareModal && currentClass && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Share Class: {currentClass.title}</h2>
            <label>Share Link</label>
            <input
              type="text"
              readOnly
              value={`https://quizmaster.com/quizzes/${currentClass.title.replace(/\s+/g, '-')}`}
            />
            <label>Mã phòng</label>
            <div className={styles.inviteCode}>INVITECODE123</div>
            <button className={styles.copyBtn}>Sao chép</button>
            <button className={styles.close} onClick={() => setShareModal(false)}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
