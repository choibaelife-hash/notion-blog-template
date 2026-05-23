"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const G    = "#bc8e53";
const DARK = "#231916";
const DEEP = "#2d1f16";
const BEIGE = "#fdf6ec";
const MUTED = "rgba(253,246,236,0.45)";
const PF   = "var(--font-playfair)";

type Badge = "Classes Open" | "Score Stories" | "Class Review" | "Award";
type Tab   = "All" | Badge;

const UPDATES: { badge: Badge; date: string; title: string; slug: string }[] = [
  { badge: "Score Stories", date: "Apr 28", title: "ACT 35 — A 6-Month Journey",        slug: "act-35-story" },
  { badge: "Class Review",  date: "Apr 15", title: "SAT 1500 Class Review",              slug: "sat-1500-review" },
  { badge: "Award",         date: "Mar 10", title: "Promising Young Writers Award",      slug: "promising-young-writers" },
  { badge: "Classes Open",  date: "May 5",  title: "AP Biology Summer Intensive Open",  slug: "ap-biology-summer" },
  { badge: "Score Stories", date: "Feb 20", title: "SAT Math 800 — Perfect Score",      slug: "sat-math-800" },
  { badge: "Classes Open",  date: "Feb 1",  title: "AP World History Spring Term Open", slug: "ap-world-history-spring" },
];

const JOURNAL: { date: string; title: string; slug: string }[] = [
  { date: "May 1",  title: "How to prepare for AP exams in 8 weeks",   slug: "ap-exam-8-weeks" },
  { date: "Apr 10", title: "Grade 8 math — 3 mistakes everyone makes", slug: "grade-8-math-mistakes" },
  { date: "Mar 22", title: "SAT Reading: how to improve 100+ points",  slug: "sat-reading-100-points" },
];

const TABS: Tab[] = ["All", "Classes Open", "Score Stories", "Class Review"];

const BADGE_STYLE: Record<Badge, React.CSSProperties> = {
  "Classes Open":  { background: "rgba(35,25,22,0.58)", color: BEIGE },
  "Score Stories": { background: G, color: "#fff" },
  "Class Review":  { background: "rgba(188,142,83,0.2)", color: "#8a5f28" },
  "Award":         { background: "rgba(147,197,253,0.28)", color: "#1d4ed8" },
};

const sectionLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: G,
  marginBottom: "0.5rem",
};

const TAB_LABELS: Record<Tab, string> = {
  "All": "All Categories",
  "Classes Open": "Classes Open",
  "Score Stories": "Score Stories",
  "Class Review": "Class Review",
};

function MobileDropdown({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (t: Tab) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", zIndex: 20 }}>
      {/* 트리거 버튼 */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1.1rem",
          borderRadius: "10px",
          border: `1.5px solid ${G}`,
          background: open ? "#fdf6ec" : "#fff",
          color: DARK,
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.04em",
          cursor: "pointer",
          transition: "background 0.15s ease",
        }}
      >
        <span style={{ color: activeTab === "All" ? "rgba(35,25,22,0.45)" : DARK }}>
          {TAB_LABELS[activeTab]}
        </span>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ transition: "transform 0.22s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
        >
          <path d="M2 4l4 4 4-4" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* 드롭다운 패널 */}
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          left: 0,
          right: 0,
          background: "#fff",
          border: `1.5px solid ${G}`,
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(35,25,22,0.10)",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        {(["All", "Classes Open", "Score Stories", "Class Review"] as Tab[]).map((tab, i, arr) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setOpen(false); }}
              style={{
                width: "100%",
                display: "block",
                textAlign: "left",
                padding: "0.8rem 1.1rem",
                fontSize: "13px",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? G : "rgba(35,25,22,0.65)",
                background: isActive ? "#fdf6ec" : "transparent",
                border: "none",
                borderBottom: i < arr.length - 1 ? "0.5px solid rgba(188,142,83,0.18)" : "none",
                cursor: "pointer",
                letterSpacing: "0.03em",
                transition: "background 0.14s ease, color 0.14s ease",
              }}
            >
              {TAB_LABELS[tab]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function BlogUpdatesSection() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const filtered = activeTab === "All" ? UPDATES : UPDATES.filter((p) => p.badge === activeTab);

  return (
    <>
      {/* ════ SECTION 2 — UPDATES ════ */}
      <section style={{ background: "#ffffff" }} className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-6">
            <p style={sectionLabel}>UPDATES</p>
          </div>

          {/* 모바일: 커스텀 드롭다운 */}
          <div className="md:hidden mb-8">
            <MobileDropdown activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* 데스크탑: 기존 탭 버튼 */}
          <div className="hidden md:flex flex-wrap gap-2 mb-10">
            {TABS.map((tab) => {
              const active = tab === activeTab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "0.45rem 1.2rem",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                    background: active ? DARK : "transparent",
                    color: active ? G : "rgba(35,25,22,0.38)",
                    border: active ? `1px solid ${DARK}` : "0.5px solid rgba(35,25,22,0.22)",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link key={post.title} href={`/blog/notice/${post.slug}`} style={{ textDecoration: "none" }}>

                {/* ── 모바일: 오버레이 카드 ── */}
                <div className="md:hidden">
                  <div
                    style={{
                      position: "relative",
                      paddingTop: "100%",
                      background: "rgba(188,142,83,0.07)",
                      borderRadius: "14px",
                      overflow: "hidden",
                    }}
                  >
                    {/* 워터마크 */}
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <p style={{ fontSize: "64px", fontWeight: 800, color: "rgba(188,142,83,0.12)", fontFamily: PF, fontStyle: "italic" }}>
                        J&amp;J
                      </p>
                    </div>
                    {/* 뱃지 — 좌측 상단 */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        borderRadius: "999px",
                        padding: "4px 11px",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        ...BADGE_STYLE[post.badge],
                      }}
                    >
                      {post.badge}
                    </div>
                    {/* 날짜 — 우측 상단 */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "rgba(35,25,22,0.55)",
                        color: "#fff",
                        borderRadius: "5px",
                        padding: "3px 9px",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {post.date}
                    </div>
                    {/* 제목 — 하단 그라디언트 오버레이 */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "linear-gradient(to top, rgba(35,25,22,0.88) 0%, transparent 100%)",
                        padding: "3rem 1.1rem 1.1rem",
                      }}
                    >
                      <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "15px", color: "#fff", fontWeight: 700, lineHeight: 1.4 }}>
                        {post.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── 데스크탑: 기존 레이아웃 ── */}
                <div className="hidden md:block cursor-pointer group">
                  <div
                    style={{
                      position: "relative",
                      paddingTop: "100%",
                      background: "rgba(188,142,83,0.07)",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                    className="mb-3"
                  >
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <p style={{ fontSize: "52px", fontWeight: 800, color: "rgba(188,142,83,0.12)", fontFamily: PF, fontStyle: "italic" }}>
                        J&amp;J
                      </p>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        borderRadius: "999px",
                        padding: "4px 10px",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        ...BADGE_STYLE[post.badge],
                      }}
                    >
                      {post.badge}
                    </div>
                  </div>
                  <p style={{ fontSize: "11px", color: "rgba(35,25,22,0.38)" }} className="mb-1">
                    {post.date}
                  </p>
                  <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "13px", color: DARK, fontWeight: 700, lineHeight: 1.5 }}>
                    {post.title}
                  </p>
                </div>

              </Link>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: "0.5px solid rgba(188,142,83,0.2)" }} />

      {/* ════ SECTION 3 — LEARNING JOURNAL ════ */}
      <section style={{ background: DEEP }} className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p style={sectionLabel}>LEARNING JOURNAL</p>
            <h2 style={{ fontFamily: PF, fontStyle: "italic", fontSize: "1.875rem", color: BEIGE, fontWeight: 700 }} className="mb-2">
              Study tips &amp; insights
            </h2>
            <p style={{ fontSize: "13px", color: MUTED }}>
              Practical advice from Jennie &amp; Jessie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {JOURNAL.map((item) => (
              <Link key={item.title} href={`/blog/journal/${item.slug}`} style={{ textDecoration: "none" }}>

                {/* ── 모바일: 오버레이 카드 ── */}
                <div className="md:hidden">
                  <div
                    style={{
                      position: "relative",
                      paddingTop: "100%",
                      background: "rgba(188,142,83,0.10)",
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: "0.5px solid rgba(188,142,83,0.35)",
                    }}
                  >
                    {/* 워터마크 */}
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <p style={{ fontSize: "64px", fontWeight: 800, color: "rgba(188,142,83,0.18)", fontFamily: PF, fontStyle: "italic" }}>
                        J&amp;J
                      </p>
                    </div>
                    {/* 날짜 — 우측 상단 */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "rgba(35,25,22,0.55)",
                        color: "#fff",
                        borderRadius: "5px",
                        padding: "3px 9px",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {item.date}
                    </div>
                    {/* 제목 — 하단 그라디언트 오버레이 */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "linear-gradient(to top, rgba(35,25,22,0.9) 0%, transparent 100%)",
                        padding: "3rem 1.1rem 1.1rem",
                      }}
                    >
                      <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "15px", color: "#fff", fontWeight: 700, lineHeight: 1.4 }}>
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── 데스크탑: 기존 레이아웃 ── */}
                <div
                  className="hidden md:block"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "0.5px solid rgba(188,142,83,0.35)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ position: "relative", paddingTop: "75%", background: "rgba(188,142,83,0.10)" }}>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <p style={{ fontSize: "44px", fontWeight: 800, color: "rgba(188,142,83,0.18)", fontFamily: PF, fontStyle: "italic" }}>
                        J&amp;J
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-5">
                    <p style={{ fontSize: "11px", color: "#a08060" }} className="mb-1">
                      {item.date}
                    </p>
                    <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "14px", color: BEIGE, fontWeight: 700, lineHeight: 1.5 }}>
                      {item.title}
                    </p>
                  </div>
                </div>

              </Link>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <a href="#" style={{ fontSize: "12px", color: G, fontWeight: 600, letterSpacing: "0.05em", textDecoration: "none" }}>
              View all articles →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
