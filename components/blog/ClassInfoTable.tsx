const G    = "#bc8e53";
const DARK = "#231916";
const MUTED = "rgba(35,25,22,0.45)";

const ROWS: { label: string; content: React.ReactNode }[] = [
  {
    label: "수업 과목",
    content: "AP English Literature & Composition",
  },
  {
    label: "수업 대상",
    content: "Grade 11–12",
  },
  {
    label: "그룹 수업 기간",
    content: "2026년 06월 22일 – 07월 31일 (6주)",
  },
  {
    label: "수업 요일 & 시간",
    content: (
      <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.3rem" }}>
        <span>
          <span style={{ color: G, fontWeight: 700 }}>선택 1</span>
          {"  "}월 / 수
        </span>
        <span>
          <span style={{ color: G, fontWeight: 700 }}>선택 2</span>
          {"  "}화 / 목
        </span>
        <span style={{ fontSize: "12px", color: MUTED }}>매회 2시간</span>
      </div>
    ),
  },
  {
    label: "개인 수업",
    content: (
      <>
        상시 오픈{" "}
        <span style={{ color: G, fontWeight: 700 }}>스케줄 협의 가능</span>
      </>
    ),
  },
  {
    label: "수업 형태",
    content: "온라인 (Zoom)",
  },
];

export default function ClassInfoTable() {
  return (
    <div style={{ border: "0.5px solid rgba(35,25,22,0.10)", borderRadius: "10px", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {ROWS.map((row, i) => (
            <tr
              key={row.label}
              style={{
                borderTop: i > 0 ? "0.5px solid rgba(35,25,22,0.07)" : undefined,
              }}
            >
              <td
                style={{
                  padding: "0.9rem 1.1rem",
                  background: "#f5f0e8",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: MUTED,
                  letterSpacing: "0.03em",
                  whiteSpace: "nowrap",
                  verticalAlign: "top",
                  width: "130px",
                }}
              >
                {row.label}
              </td>
              <td
                style={{
                  padding: "0.9rem 1.2rem",
                  fontSize: "13px",
                  color: DARK,
                  fontWeight: 500,
                  lineHeight: 1.7,
                  background: "#fff",
                }}
              >
                {row.content}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
