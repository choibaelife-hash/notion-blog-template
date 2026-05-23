import { notFound } from "next/navigation";
import {
  fetchNoticePostBySlug,
  fetchUpcomingPosts,
  formatShortDate,
  type RawBlock,
} from "@/lib/notion";

const G     = "#bc8e53";
const DARK  = "#231916";
const DEEP  = "#2d1f16";
const BEIGE = "#fdf6ec";
const MUTED = "rgba(35,25,22,0.42)";
const PF    = "var(--font-playfair)";

const BADGE_STYLE: Record<string, React.CSSProperties> = {
  "Classes Open":  { background: "rgba(35,25,22,0.58)", color: BEIGE },
  "Score Stories": { background: G, color: "#fff" },
  "Class Review":  { background: "rgba(188,142,83,0.2)", color: "#8a5f28" },
  "Award":         { background: "rgba(147,197,253,0.28)", color: "#1d4ed8" },
};

const sectionLabel: React.CSSProperties = {
  fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em",
  textTransform: "uppercase", color: G, marginBottom: "0.5rem",
};

const divider = <div style={{ borderTop: "0.5px solid rgba(35,25,22,0.10)", margin: "2rem 0" }} />;

function rt(segments?: { plain_text: string }[]): string {
  return segments?.map((s) => s.plain_text).join("") ?? "";
}

type RichSeg = { plain_text: string; annotations?: { bold?: boolean; italic?: boolean; code?: boolean }; href?: string | null };

function RichText({ segs }: { segs?: RichSeg[] }) {
  if (!segs?.length) return null;
  return (
    <>
      {segs.map((seg, i) => {
        const { bold, italic, code } = seg.annotations ?? {};
        const text = seg.plain_text;
        if (code)           return <code key={i} style={{ background: "rgba(35,25,22,0.07)", borderRadius: "4px", padding: "1px 5px", fontSize: "0.88em", fontFamily: "monospace" }}>{text}</code>;
        if (bold && italic) return <strong key={i}><em>{text}</em></strong>;
        if (bold)           return <strong key={i}>{text}</strong>;
        if (italic)         return <em key={i}>{text}</em>;
        return <span key={i}>{text}</span>;
      })}
    </>
  );
}

function BlockRenderer({ blocks }: { blocks: RawBlock[] }) {
  let numCounter = 0;
  const annotated = blocks.map((block) => {
    if (block.type === "numbered_list_item") { numCounter++; return { ...block, _n: numCounter }; }
    numCounter = 0;
    return block;
  });

  return (
    <>
      {annotated.map((block, i) => {
        switch (block.type) {
          case "paragraph": {
            const text = rt(block.paragraph?.rich_text);
            if (!text.trim()) return <div key={i} style={{ height: "0.6rem" }} />;
            return (
              <p key={i} style={{ fontSize: "14px", color: "rgba(35,25,22,0.72)", lineHeight: 1.85, marginBottom: "0.75rem" }}>
                <RichText segs={block.paragraph?.rich_text} />
              </p>
            );
          }
          case "heading_2": {
            return (
              <h2 key={i} style={{ fontFamily: PF, fontStyle: "italic", fontSize: "1.2rem", color: DARK, fontWeight: 700, marginBottom: "0.7rem", marginTop: "1.6rem" }}>
                <RichText segs={block.heading_2?.rich_text} />
              </h2>
            );
          }
          case "heading_3": {
            return (
              <h3 key={i} style={{ fontSize: "12px", fontWeight: 700, color: DARK, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", marginTop: "1.2rem" }}>
                <RichText segs={block.heading_3?.rich_text} />
              </h3>
            );
          }
          case "bulleted_list_item": {
            return (
              <p key={i} style={{ fontSize: "14px", color: "rgba(35,25,22,0.72)", lineHeight: 1.85, marginBottom: "0.4rem", paddingLeft: "1rem" }}>
                · <RichText segs={block.bulleted_list_item?.rich_text} />
              </p>
            );
          }
          case "numbered_list_item": {
            return (
              <p key={i} style={{ fontSize: "14px", color: "rgba(35,25,22,0.72)", lineHeight: 1.85, marginBottom: "0.4rem", paddingLeft: "1rem" }}>
                {block._n}. <RichText segs={block.numbered_list_item?.rich_text} />
              </p>
            );
          }
          case "callout": {
            return (
              <div key={i} style={{ borderLeft: `3px solid ${G}`, background: BEIGE, borderRadius: "0 10px 10px 0", padding: "1.1rem 1.4rem", margin: "1.4rem 0" }}>
                <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "14px", color: DARK, lineHeight: 1.75, fontWeight: 600 }}>
                  <RichText segs={block.callout?.rich_text} />
                </p>
              </div>
            );
          }
          case "divider": {
            return <div key={i} style={{ borderTop: "0.5px solid rgba(35,25,22,0.10)", margin: "1.6rem 0" }} />;
          }
          case "table": {
            const rows: RawBlock[] = block._rows ?? [];
            const hasHeader: boolean = block.table?.has_column_header ?? false;
            const colCount: number = block.table?.table_width ?? 1;
            return (
              <div key={i} style={{ borderRadius: "10px", border: "0.5px solid rgba(35,25,22,0.10)", overflow: "hidden", marginBottom: "1.6rem" }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                    <tbody>
                      {rows.map((row, ri) => (
                        <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? "0.5px solid rgba(35,25,22,0.08)" : undefined, background: ri === 0 && hasHeader ? "rgba(188,142,83,0.07)" : ri % 2 === 0 ? "#faf8f5" : "#fff" }}>
                          {(row.table_row?.cells ?? []).map((cell: { plain_text: string }[], ci: number) => {
                            const cellText = cell.map((r) => r.plain_text).join("");
                            const isHeader = ri === 0 && hasHeader;
                            return isHeader ? (
                              <th key={ci} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700, color: DARK, borderRight: ci < colCount - 1 ? "0.5px solid rgba(35,25,22,0.06)" : undefined }}>
                                {cellText}
                              </th>
                            ) : (
                              <td key={ci} style={{ padding: "10px 16px", color: "rgba(35,25,22,0.72)", lineHeight: 1.6, borderRight: ci < colCount - 1 ? "0.5px solid rgba(35,25,22,0.06)" : undefined }}>
                                {cellText}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
}

export default async function NoticePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [post, allUpcoming] = await Promise.all([
    fetchNoticePostBySlug(slug),
    fetchUpcomingPosts(),
  ]);

  if (!post) notFound();

  const badgeStyle = BADGE_STYLE[post.badge] ?? { background: "rgba(35,25,22,0.15)", color: DARK };
  const related = allUpcoming.filter((p) => p.slug !== slug).slice(0, 3);

  const sidebarRows = [
    post.gradeTag ? { label: "Grade", value: post.gradeTag } : null,
    post.classType ? { label: "Format", value: post.classType } : null,
    post.schedule  ? { label: "Schedule", value: post.schedule } : null,
    post.duration  ? { label: "Duration", value: post.duration } : null,
    post.date      ? { label: "Start Date", value: formatShortDate(post.date) } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  // Fallback row if no property data yet
  if (sidebarRows.length === 0 && post.date) {
    sidebarRows.push({ label: "Date", value: formatShortDate(post.date) });
  }

  return (
    <div style={{ background: "#faf8f5", minHeight: "100vh" }}>

      {/* ── 1. BADGE + TITLE ── */}
      <section style={{ background: DEEP, paddingTop: "clamp(2.5rem, 5vw, 4rem)", paddingBottom: 0 }}>
        <div className="max-w-6xl mx-auto px-6">
          <span style={{ display: "inline-block", borderRadius: "999px", padding: "4px 14px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "1rem", ...badgeStyle }}>
            {post.badge}
          </span>
          <h1 style={{ fontFamily: PF, fontStyle: "italic", fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", color: BEIGE, fontWeight: 700, lineHeight: 1.35, marginBottom: "1rem", maxWidth: "820px" }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            <span style={{ fontSize: "12px", color: "rgba(253,246,236,0.5)" }}>
              {post.date ? formatShortDate(post.date) : ""}
            </span>
            {post.gradeTag && (
              <span style={{ background: "rgba(188,142,83,0.18)", color: G, borderRadius: "999px", padding: "3px 12px", fontSize: "11px", fontWeight: 700 }}>
                {post.gradeTag}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── 2. HERO IMAGE 16:7 ── */}
      <div style={{ position: "relative", paddingTop: "calc(7 / 16 * 100%)", background: DEEP }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(45,31,22,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 800, color: "rgba(188,142,83,0.18)" }}>
            J&amp;J
          </p>
        </div>
      </div>

      {/* ── 3. TWO-COLUMN BODY ── */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ── MAIN CONTENT ── */}
          <main style={{ flex: 1, minWidth: 0 }}>
            <BlockRenderer blocks={post.blocks} />
            {divider}
            {post.grades.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {post.grades.map((tag) => (
                  <span key={tag} style={{ background: "rgba(188,142,83,0.10)", color: "#8a5f28", borderRadius: "999px", padding: "4px 14px", fontSize: "11px", fontWeight: 600 }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </main>

          {/* ── STICKY SIDEBAR ── */}
          <aside style={{ width: "100%", maxWidth: "300px", flexShrink: 0, position: "sticky", top: "80px", alignSelf: "flex-start", display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Class info card */}
            <div style={{ background: "#fff", border: "0.5px solid rgba(35,25,22,0.10)", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 4px 20px rgba(35,25,22,0.07)" }}>
              <p style={{ ...sectionLabel, marginBottom: "1rem" }}>Class Info</p>

              {sidebarRows.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.4rem" }}>
                  {sidebarRows.map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "12px", color: MUTED, fontWeight: 600, whiteSpace: "nowrap" }}>{row.label}</span>
                      <span style={{ fontSize: "12px", color: DARK, fontWeight: 700, textAlign: "right" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <a href="/contact" style={{ display: "block", textAlign: "center", background: G, color: "#fff", borderRadius: "8px", padding: "0.7rem 1rem", fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em", textDecoration: "none", marginBottom: "0.5rem" }}>
                Enroll Now
              </a>
              <a href="/contact" style={{ display: "block", textAlign: "center", background: "transparent", color: G, border: `1.5px solid ${G}`, borderRadius: "8px", padding: "0.65rem 1rem", fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em", textDecoration: "none" }}>
                Free Consultation
              </a>
            </div>

            {/* Other classes card */}
            {related.length > 0 && (
              <div style={{ background: DEEP, borderRadius: "16px", padding: "1.5rem", boxShadow: "0 4px 20px rgba(45,31,22,0.18)" }}>
                <p style={{ ...sectionLabel, color: G, marginBottom: "1rem" }}>Other Classes</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {related.map((c) => (
                    <a key={c.slug} href={`/blog/notice/${c.slug}`} style={{ textDecoration: "none", display: "block", background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(188,142,83,0.25)", borderRadius: "10px", padding: "0.85rem 1rem", cursor: "pointer" }}>
                      <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "12px", color: BEIGE, fontWeight: 700, lineHeight: 1.4, marginBottom: "0.3rem" }}>
                        {c.title}
                      </p>
                      <p style={{ fontSize: "11px", color: G, fontWeight: 600 }}>
                        Opens {c.opens} →
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </aside>
        </div>
      </div>

    </div>
  );
}
