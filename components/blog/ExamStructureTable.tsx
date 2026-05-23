const G    = "#bc8e53";
const DARK = "#231916";

const ROWS = [
  {
    no: "①",
    section: "Multiple Choice (MCQ)",
    count: "55문항",
    weight: "45%",
    time: "1시간",
  },
  {
    no: "②",
    section: (
      <>
        Free Response (FRQ)
        <ul style={{ margin: "0.4rem 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column" as const, gap: "0.2rem" }}>
          {["시 분석 (Poetry Analysis)", "산문 분석 (Prose Fiction)", "자유 선택 (Literary Argument)"].map((s) => (
            <li key={s} style={{ fontSize: "11px", color: "rgba(35,25,22,0.5)", paddingLeft: "0.8rem", position: "relative" as const }}>
              <span style={{ position: "absolute" as const, left: 0 }}>·</span>{s}
            </li>
          ))}
        </ul>
      </>
    ),
    count: "3문항",
    weight: "55%",
    time: "2시간",
  },
];

const WeightBadge = ({ value }: { value: string }) => {
  const isGold = value === "45%";
  return (
    <span
      style={{
        display: "inline-block",
        borderRadius: "999px",
        padding: "3px 12px",
        fontSize: "12px",
        fontWeight: 700,
        background: isGold ? "rgba(188,142,83,0.15)" : "rgba(35,25,22,0.08)",
        color: isGold ? G : DARK,
      }}
    >
      {value}
    </span>
  );
};

export default function ExamStructureTable() {
  return (
    <div style={{ border: "0.5px solid rgba(35,25,22,0.10)", borderRadius: "10px", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f0e8" }}>
            {["번호", "시험 구성", "총 문항수", "채점 비율", "소요 시간"].map((h) => (
              <th
                key={h}
                style={{
                  padding: "0.7rem 1rem",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: G,
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => (
            <tr
              key={i}
              style={{
                background: i % 2 === 0 ? "#fff" : "rgba(188,142,83,0.03)",
                borderTop: "0.5px solid rgba(35,25,22,0.07)",
              }}
            >
              <td style={{ padding: "0.9rem 1rem", fontSize: "14px", color: G, fontWeight: 700, whiteSpace: "nowrap" }}>
                {row.no}
              </td>
              <td style={{ padding: "0.9rem 1rem", fontSize: "13px", color: DARK, fontWeight: 600, lineHeight: 1.5 }}>
                {row.section}
              </td>
              <td style={{ padding: "0.9rem 1rem", fontSize: "13px", color: DARK, whiteSpace: "nowrap" }}>
                {row.count}
              </td>
              <td style={{ padding: "0.9rem 1rem", whiteSpace: "nowrap" }}>
                <WeightBadge value={row.weight} />
              </td>
              <td style={{ padding: "0.9rem 1rem", fontSize: "13px", color: DARK, whiteSpace: "nowrap" }}>
                {row.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
