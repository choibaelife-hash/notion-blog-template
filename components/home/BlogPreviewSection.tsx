"use client";

import { useEffect, useRef, useState } from "react";

// ── 데이터만 교체하면 바로 반영 ──────────────────────────────────────────────
const BLOG_POSTS = [
  { id: 1, category: "SAT PREP",   title: "How to Boost Your SAT Score by 200 Points",            date: "Nov 20, 2024", link: "#" },
  { id: 2, category: "AMC",        title: "AMC 8 Preparation Guide for Grade 7 Students",          date: "Nov 15, 2024", link: "#" },
  { id: 3, category: "AP CLASS",   title: "Which AP Classes Should Your Child Take in Grade 9?",   date: "Nov 10, 2024", link: "#" },
  { id: 4, category: "IB PROGRAM", title: "IB vs AP: What's Best for International Students?",    date: "Oct 28, 2024", link: "#" },
  { id: 5, category: "ESSAY",      title: "English Essay Contest Tips for Middle Schoolers",       date: "Oct 15, 2024", link: "#" },
  { id: 6, category: "GPA",        title: "How to Maintain a 4.0 GPA in High School",             date: "Oct  5, 2024", link: "#" },
];
// ─────────────────────────────────────────────────────────────────────────────

const CARD_W = 300;
const GAP    = 24;
const SLOT   = CARD_W + GAP;
const N      = BLOG_POSTS.length;
const cards  = [...BLOG_POSTS, ...BLOG_POSTS, ...BLOG_POSTS];

export default function BlogPreviewSection() {
  const [idx, setIdx]         = useState(N);    // 중간 복사본 첫 번째부터 시작
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused]   = useState(false);
  const [shown, setShown]     = useState(false);
  const sectionRef            = useRef<HTMLElement>(null);

  // 스크롤 진입 애니메이션
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShown(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 경계 도달 시 같은 카드의 중간 복사본으로 무음 점프
  useEffect(() => {
    const tooHigh = idx >= N * 2;
    const tooLow  = idx < N;
    if (!tooHigh && !tooLow) return;
    const t = setTimeout(() => {
      setAnimated(false);
      setIdx(i => (tooHigh ? i - N : i + N));
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      );
    }, 420);
    return () => clearTimeout(t);
  }, [idx]);

  // 자동재생 4초
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setAnimated(true);
      setIdx(i => i + 1);
    }, 4000);
    return () => clearInterval(t);
  }, [paused]);

  const move = (dir: 1 | -1) => {
    setAnimated(true);
    setIdx(i => i + dir);
  };

  const dotActive = ((idx % N) + N) % N;

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white"
      style={{ overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* 헤더 */}
        <div
          className="text-center mb-14"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: "#bc8e53" }}>
            News &amp; Updates
          </p>
          <h2 className="text-3xl font-bold tracking-tight" style={{ color: "#231916" }}>
            What&apos;s New at Jennie &amp; Jessie
          </h2>
        </div>

        {/* 슬라이더 행 */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

          {/* 이전 화살표 */}
          <button
            onClick={() => move(-1)}
            style={{
              flexShrink: 0,
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "#bc8e53",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: shown ? 1 : 0,
              transition: "background-color 0.2s ease, opacity 0.6s ease-out 0.3s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* 트랙 뷰포트 */}
          <div style={{ flex: 1, overflow: "hidden", padding: "28px 0" }}>
            <div
              style={{
                display: "flex",
                gap: `${GAP}px`,
                transform: `translateX(calc(50% - ${idx * SLOT + CARD_W / 2}px))`,
                transition: animated ? "transform 0.4s ease" : "none",
              }}
            >
              {cards.map((post, i) => {
                const offset    = i - idx;
                const absOffset = Math.abs(offset);
                const scale     = absOffset === 0 ? 1 : 0.92;
                const opacity   = absOffset === 0 ? 1 : absOffset === 1 ? 0.6 : 0;
                return (
                  <a
                    key={`${post.id}-${Math.floor(i / N)}`}
                    href={post.link}
                    style={{
                      width: `${CARD_W}px`,
                      flexShrink: 0,
                      backgroundColor: "#ffffff",
                      borderRadius: "16px",
                      boxShadow: absOffset === 0
                        ? "0 12px 40px rgba(35,25,22,0.14)"
                        : "0 4px 16px rgba(35,25,22,0.07)",
                      overflow: "hidden",
                      textDecoration: "none",
                      display: "block",
                      transform: `scale(${scale})`,
                      opacity,
                      transition: "transform 0.4s ease, opacity 0.4s ease, box-shadow 0.4s ease",
                      transformOrigin: "center top",
                      pointerEvents: absOffset === 0 ? "auto" : "none",
                    }}
                  >
                    {/* 썸네일 */}
                    <div style={{
                      width: "100%",
                      height: "180px",
                      backgroundColor: "#fdf6ec",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <p style={{
                        fontSize: "40px",
                        fontWeight: 800,
                        color: "rgba(188,142,83,0.18)",
                        fontFamily: "var(--font-playfair)",
                        fontStyle: "italic",
                        letterSpacing: "-1px",
                        lineHeight: 1,
                      }}>
                        J&amp;J
                      </p>
                      {/* 카테고리 태그 */}
                      <div style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        backgroundColor: "#bc8e53",
                        borderRadius: "999px",
                        padding: "4px 10px",
                      }}>
                        <p style={{ fontSize: "10px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.06em", lineHeight: 1 }}>
                          {post.category}
                        </p>
                      </div>
                    </div>

                    {/* 카드 본문 */}
                    <div style={{ padding: "16px 18px 20px" }}>
                      <p style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#231916",
                        lineHeight: 1.45,
                        marginBottom: "14px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      } as React.CSSProperties}>
                        {post.title}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <p style={{ fontSize: "12px", color: "rgba(35,25,22,0.40)", fontWeight: 500 }}>
                          {post.date}
                        </p>
                        <p style={{
                          fontSize: "11px",
                          fontWeight: 800,
                          color: "#bc8e53",
                          fontFamily: "var(--font-playfair)",
                          fontStyle: "italic",
                        }}>
                          J&amp;J Classroom
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* 다음 화살표 */}
          <button
            onClick={() => move(1)}
            style={{
              flexShrink: 0,
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "#bc8e53",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: shown ? 1 : 0,
              transition: "background-color 0.2s ease, opacity 0.6s ease-out 0.3s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

        </div>

        {/* 닷 인디케이터 */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
          {BLOG_POSTS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAnimated(true); setIdx(N + i); }}
              style={{
                width: i === dotActive ? "20px" : "8px",
                height: "8px",
                borderRadius: "999px",
                backgroundColor: i === dotActive ? "#bc8e53" : "rgba(188,142,83,0.28)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background-color 0.3s ease",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
