import { Link } from "react-router-dom";
import { CLUBS } from "@/data/clubs";
import type { Club } from "@/types";
import { useApp } from "@/context/AppContext";

export default function Compare() {
  const { compare, toggleCompare } = useApp();
  const clubs = compare
    .map((id) => CLUBS.find((c) => c.id === id))
    .filter((c): c is Club => Boolean(c));

  const rows: { label: string; get: (c: Club) => string }[] = [
    { label: "周投入(小时/周)", get: (c) => String(c.weeklyHours) },
    { label: "零基础友好", get: (c) => (c.beginnerFriendly ? "是" : "否") },
    { label: "会费", get: (c) => (c.recruitment.fee === 0 ? "无" : `${c.recruitment.fee} 元/年`) },
    {
      label: "考核",
      get: (c) =>
        c.recruitment.assessment === "none"
          ? "无"
          : c.recruitment.assessment === "both"
            ? "笔试+面试"
            : c.recruitment.assessment === "written"
              ? "笔试"
              : "面试",
    },
    { label: "二课学分", get: (c) => (c.recruitment.credits ? "可认定" : "无") },
    { label: "报名截止", get: (c) => c.deadline },
  ];

  return (
    <div>
      <h1>社团对比</h1>
      <p className="muted">最多 3 个社团；在社团详情页可加入/移出。</p>

      {clubs.length === 0 ? (
        <p>
          清单为空。<Link to="/student/discover">去发现</Link>
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 520,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow)",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th style={{ textAlign: "left", padding: "0.65rem" }}>维度</th>
                {clubs.map((c) => (
                  <th key={c.id} style={{ padding: "0.65rem", fontSize: "0.9rem", verticalAlign: "top" }}>
                    {c.name}
                    <button
                      type="button"
                      className="btn btn-ghost"
                      style={{ fontSize: "0.7rem", display: "block", margin: "0.35rem auto 0" }}
                      onClick={() => toggleCompare(c.id)}
                    >
                      移除
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "0.55rem", color: "var(--muted)", fontSize: "0.88rem" }}>{row.label}</td>
                  {clubs.map((c) => (
                    <td key={c.id} style={{ padding: "0.55rem", fontSize: "0.88rem" }}>
                      {row.get(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
