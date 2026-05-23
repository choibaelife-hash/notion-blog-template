import Link from "next/link";
import { fetchUpcomingPosts, type UpcomingPost } from "@/lib/notion";
import BlogUpdatesSection from "./BlogUpdatesSection";

const G    = "#bc8e53";
const DEEP = "#2d1f16";
const DARK = "#231916";
const BEIGE = "#fdf6ec";
const MUTED = "rgba(253,246,236,0.45)";
const DMUTED = "rgba(35,25,22,0.45)";
const PF   = "var(--font-playfair)";

const sectionLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: G,
  marginBottom: "0.5rem",
};

function UpcomingCard({ item }: { item: UpcomingPost }) {
  const card = (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid rgba(35,25,22,0.08)",
        borderRadius: "12px",
      }}
      className="p-7 flex flex-col h-full"
    >
      {item.season && (
        <p style={{ fontSize: "11px", color: DMUTED, letterSpacing: "0.1em" }} className="mb-1">
          {item.season}
        </p>
      )}
      <h3 style={{ fontFamily: PF, fontStyle: "italic", fontSize: "1.2rem", color: DARK, fontWeight: 700 }} className="mb-2">
        {item.title}
      </h3>
      {item.desc && (
        <p style={{ fontSize: "13px", color: DMUTED }} className="mb-6 flex-1">
          {item.desc}
        </p>
      )}
      {!item.desc && <div className="flex-1" />}
      {item.opens && (
        <p style={{ fontSize: "13px", color: G, fontWeight: 600 }}>
          Opens {item.opens} →
        </p>
      )}
    </div>
  );

  if (item.slug) {
    return (
      <Link href={`/blog/notice/${item.slug}`} style={{ textDecoration: "none" }}>
        {card}
      </Link>
    );
  }
  return card;
}

export default async function BlogPage() {
  const upcoming = await fetchUpcomingPosts();

  return (
    <div>

      {/* ════ HERO ════ */}
      <section style={{ background: DEEP, paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <p style={sectionLabel}>BLOG</p>
          <h1 style={{ fontFamily: PF, fontStyle: "italic", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: BEIGE, fontWeight: 700, lineHeight: 1.25, marginBottom: "1rem", maxWidth: "600px" }}>
            Updates &amp; Upcoming Classes
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(253,246,236,0.55)", lineHeight: 1.8, maxWidth: "480px" }}>
            Stay up to date with new class openings, student stories, and learning resources from our team.
          </p>
        </div>
      </section>

      {/* ════ UPCOMING (below hero) ════ */}
      <section style={{ background: BEIGE, borderTop: "0.5px solid rgba(35,25,22,0.08)", paddingTop: "3rem", paddingBottom: "3.5rem" }}>
        <div className="max-w-6xl mx-auto px-6 w-full">

          <div className="mb-8">
            <p style={sectionLabel}>UPCOMING</p>
            <h2 style={{ fontFamily: PF, fontStyle: "italic", fontSize: "1.5rem", color: DARK, fontWeight: 700 }}>
              What&apos;s opening soon
            </h2>
          </div>

          {upcoming.length === 0 ? (
            <p style={{ fontSize: "14px", color: DMUTED }}>No upcoming classes at this time.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcoming.map((item) => (
                <UpcomingCard key={item.slug} item={item} />
              ))}
            </div>
          )}

        </div>
      </section>

      <div style={{ borderTop: "0.5px solid rgba(188,142,83,0.2)" }} />

      {/* ════ SECTION 2 + 3 — UPDATES & JOURNAL (static) ════ */}
      <BlogUpdatesSection />

    </div>
  );
}
