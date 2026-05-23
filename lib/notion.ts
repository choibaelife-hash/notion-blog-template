const NOTION_API_KEY = process.env.NOTION_API_KEY!;
const NOTION_NOTICE_DB_ID = process.env.NOTION_NOTICE_DB_ID!;

export type UpcomingPost = {
  title: string;
  season: string;
  desc: string;
  opens: string;
  slug: string;
};

function getSeasonLabel(dateStr: string): string {
  const month = new Date(dateStr + "T12:00:00").getMonth() + 1;
  const year = new Date(dateStr + "T12:00:00").getFullYear();
  const season = month >= 3 && month <= 5 ? "Spring"
    : month >= 6 && month <= 8 ? "Summer"
    : month >= 9 && month <= 11 ? "Fall"
    : "Winter";
  return `${year} ${season}`;
}

function formatShortDate(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractText(richText: any[]): string {
  return richText?.[0]?.plain_text ?? "";
}

// ── Notice detail ───────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RawBlock = Record<string, any> & { id: string; type: string };

export type NoticeDetail = {
  id: string;
  title: string;
  badge: string;
  date: string;
  slug: string;
  gradeTag: string;
  grades: string[];
  subject: string;
  classType: string;
  schedule: string;
  duration: string;
  blocks: RawBlock[];
};

async function fetchBlockChildren(blockId: string): Promise<RawBlock[]> {
  try {
    const res = await fetch(
      `https://api.notion.com/v1/blocks/${blockId}/children?page_size=100`,
      {
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.results ?? [];
  } catch {
    return [];
  }
}

export async function fetchNoticePostBySlug(slug: string): Promise<NoticeDetail | null> {
  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_NOTICE_DB_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: { property: "Slug", rich_text: { equals: slug } },
        }),
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const page = data.results?.[0];
    if (!page) return null;

    const p = page.properties;
    const rawBlocks = await fetchBlockChildren(page.id);

    // Fetch table row children in parallel
    const blocks: RawBlock[] = await Promise.all(
      rawBlocks.map(async (block) => {
        if (block.type === "table") {
          const rows = await fetchBlockChildren(block.id);
          return { ...block, _rows: rows };
        }
        return block;
      })
    );

    return {
      id: page.id,
      title: extractText(p.Title?.title),
      badge: p.Category?.select?.name ?? "",
      date: p.Date?.date?.start ?? "",
      slug: extractText(p.Slug?.rich_text),
      gradeTag: extractText(p.TargetGrade?.rich_text),
      grades: (p.Grade?.multi_select ?? []).map((g: { name: string }) => g.name),
      subject: extractText(p.Subject?.rich_text),
      classType: extractText(p.ClassType?.rich_text),
      schedule: extractText(p.Schedule?.rich_text),
      duration: extractText(p.Duration?.rich_text),
      blocks,
    };
  } catch {
    return null;
  }
}

export { formatShortDate };

// ── Upcoming posts ───────────────────────────────────────────────────────────

export async function fetchUpcomingPosts(): Promise<UpcomingPost[]> {
  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_NOTICE_DB_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            and: [
              { property: "Published", checkbox: { equals: true } },
              { property: "Category", select: { equals: "Classes Open" } },
            ],
          },
          sorts: [{ property: "Date", direction: "ascending" }],
        }),
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.results as any[])
      .map((page) => {
        const p = page.properties;
        const title = extractText(p.Title?.title);
        const slug = extractText(p.Slug?.rich_text);
        const dateStr: string = p.Date?.date?.start ?? "";
        const targetGrade = extractText(p.TargetGrade?.rich_text);
        const classType = extractText(p.ClassType?.rich_text);
        const desc = [classType, targetGrade].filter(Boolean).join(" · ");

        return {
          title,
          season: dateStr ? getSeasonLabel(dateStr) : "",
          desc,
          opens: dateStr ? formatShortDate(dateStr) : "",
          slug,
        };
      })
      .filter((p) => p.title && p.slug);
  } catch {
    return [];
  }
}
