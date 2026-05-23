"use client";

import { use, useState, useEffect } from "react";
import { JOURNAL_POSTS, type JournalPost } from "../../data";
import Link from "next/link";

// ── Brand tokens ───────────────────────────────────────────────────────────────
const G     = "#bc8e53";
const DARK  = "#231916";
const DEEP  = "#2d1f16";
const BEIGE = "#fdf6ec";
const MUTED = "rgba(35,25,22,0.42)";
const PF    = "var(--font-playfair)";

const sectionLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: G,
  marginBottom: "0.5rem",
};

// ── Component ──────────────────────────────────────────────────────────────────
export default function JournalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post: JournalPost | undefined = JOURNAL_POSTS.find((p) => p.slug === slug);

  const [activeToc, setActiveToc] = useState<string>("");

  useEffect(() => {
    if (!post) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveToc(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    post.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [post]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!post) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: MUTED, fontFamily: PF, fontStyle: "italic", fontSize: "1.2rem" }}>Post not found.</p>
      </div>
    );
  }

  return (
    <div style={{ background: "#faf8f5", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════════ HERO ═══════════════════ */}
      <section style={{ background: DEEP, paddingTop: "clamp(3rem, 7vw, 5rem)", paddingBottom: "clamp(2rem, 5vw, 3.5rem)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <span style={{ display: "inline-block", background: G, color: "#fff", borderRadius: "999px", padding: "4px 14px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "1rem" }}>
            {post.badge}
          </span>
          <h1 style={{ fontFamily: PF, fontStyle: "italic", fontSize: "clamp(1.5rem, 3.8vw, 2.4rem)", color: BEIGE, fontWeight: 700, lineHeight: 1.3, marginBottom: "1rem", maxWidth: "760px" }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "rgba(253,246,236,0.5)" }}>{post.date}</span>
            <span style={{ fontSize: "12px", color: "rgba(253,246,236,0.3)" }}>·</span>
            <span style={{ fontSize: "12px", color: "rgba(253,246,236,0.5)" }}>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ BODY + SIDEBAR ═══════════════ */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ── MAIN ── */}
          <main style={{ flex: 1, minWidth: 0 }}>

            {/* Lead */}
            <p style={{ fontSize: "15px", color: DARK, lineHeight: 1.85, borderLeft: `4px solid ${G}`, paddingLeft: "1.2rem", marginBottom: "3rem", fontStyle: "italic" }}>
              {post.lead}
            </p>

            {/* Sections */}
            {post.sections.map((sec) => (
              <section key={sec.id} id={sec.id} style={{ marginBottom: "3rem", scrollMarginTop: "90px" }}>

                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: G, marginBottom: "0.4rem" }}>
                  {sec.label} —
                </p>

                <h2 style={{ fontFamily: PF, fontStyle: "italic", fontSize: "1.45rem", color: DARK, fontWeight: 700, marginBottom: "1.1rem" }}>
                  {sec.title}
                </h2>

                {sec.body.map((para, i) => (
                  <p key={i} style={{ fontSize: "14px", color: "rgba(35,25,22,0.72)", lineHeight: 1.85, marginBottom: "0.9rem" }}>
                    {para}
                  </p>
                ))}

                {sec.checklist && (
                  <div style={{ background: "rgba(188,142,83,0.07)", border: "0.5px solid rgba(188,142,83,0.28)", borderRadius: "10px", padding: "1.1rem 1.4rem", marginTop: "1rem" }}>
                    <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: G, marginBottom: "0.7rem" }}>ACTION CHECKLIST</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {sec.checklist.map((item) => (
                        <li key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                          <span style={{ color: G, fontWeight: 700, fontSize: "14px", lineHeight: 1.5, flexShrink: 0 }}>✓</span>
                          <span style={{ fontSize: "13px", color: DARK, lineHeight: 1.6 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {sec.table && (
                  <div style={{ border: "0.5px solid rgba(35,25,22,0.10)", borderRadius: "12px", overflow: "hidden", marginTop: "1.2rem" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: DEEP }}>
                          {["기간", "집중 영역", "주간 목표"].map((h) => (
                            <th key={h} style={{ padding: "0.7rem 1rem", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: G, textAlign: "left" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sec.table.map((row, i) => (
                          <tr key={row.phase} style={{ background: i % 2 === 0 ? "#fff" : "rgba(188,142,83,0.04)", borderTop: "0.5px solid rgba(35,25,22,0.07)" }}>
                            <td style={{ padding: "0.8rem 1rem", fontSize: "12px", color: G, fontWeight: 700, whiteSpace: "nowrap" }}>{row.phase}</td>
                            <td style={{ padding: "0.8rem 1rem", fontSize: "13px", color: DARK, fontWeight: 600 }}>{row.focus}</td>
                            <td style={{ padding: "0.8rem 1rem", fontSize: "12px", color: MUTED }}>{row.goal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              </section>
            ))}

          </main>

          {/* ── SIDEBAR ── */}
          <aside style={{ width: "100%", maxWidth: "280px", flexShrink: 0, position: "sticky", top: "80px", alignSelf: "flex-start", display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* TOC */}
            <div style={{ background: "#fff", border: "0.5px solid rgba(35,25,22,0.10)", borderRadius: "14px", padding: "1.3rem 1.4rem", boxShadow: "0 4px 16px rgba(35,25,22,0.06)" }}>
              <p style={{ ...sectionLabel, marginBottom: "0.9rem" }}>CONTENTS</p>
              <nav style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                {post.sections.map((sec) => {
                  const isActive = activeToc === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollTo(sec.id)}
                      style={{
                        textAlign: "left", background: "none", border: "none", cursor: "pointer",
                        padding: "0.45rem 0.6rem", borderRadius: "6px",
                        fontSize: "12px", fontWeight: isActive ? 700 : 500,
                        color: isActive ? G : MUTED,
                        borderLeft: isActive ? `3px solid ${G}` : "3px solid transparent",
                        transition: "all 0.18s ease", lineHeight: 1.45,
                      }}
                    >
                      <span style={{ color: G, marginRight: "0.4rem", fontSize: "10px" }}>{sec.label}</span>
                      {sec.title}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Related classes */}
            <div style={{ background: DEEP, borderRadius: "14px", padding: "1.3rem 1.4rem", boxShadow: "0 4px 20px rgba(45,31,22,0.18)" }}>
              <p style={{ ...sectionLabel, color: G, marginBottom: "1rem" }}>RELATED CLASSES</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {post.relatedClasses.map((c) => (
                  <div key={c.title} style={{ background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(188,142,83,0.25)", borderRadius: "9px", padding: "0.75rem 0.9rem", cursor: "pointer" }}>
                    <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "12px", color: BEIGE, fontWeight: 700, lineHeight: 1.4, marginBottom: "0.25rem" }}>{c.title}</p>
                    <p style={{ fontSize: "11px", color: G, fontWeight: 600 }}>Opens {c.opens} →</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next post */}
            <Link
              href={`/blog/journal/${post.nextPost.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div style={{ background: "#fff", border: "0.5px solid rgba(35,25,22,0.10)", borderRadius: "14px", padding: "1.3rem 1.4rem", boxShadow: "0 4px 16px rgba(35,25,22,0.06)", cursor: "pointer" }}>
                <p style={{ ...sectionLabel, marginBottom: "0.6rem" }}>NEXT</p>
                <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "13px", color: DARK, fontWeight: 700, lineHeight: 1.45, marginBottom: "0.4rem" }}>
                  {post.nextPost.title}
                </p>
                <p style={{ fontSize: "11px", color: MUTED }}>{post.nextPost.date}</p>
                <p style={{ fontSize: "11px", color: G, fontWeight: 700, marginTop: "0.5rem" }}>Read next →</p>
              </div>
            </Link>

          </aside>
        </div>
      </div>

    </div>
  );
}
