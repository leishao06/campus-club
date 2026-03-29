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
    { label: "周投入（小时/周）", get: (c) => String(c.weeklyHours) },
    { label: "零基础友好", get: (c) => (c.beginnerFriendly ? "是" : "否") },
    { label: "会费", get: (c) => (c.recruitment.fee === 0 ? "无" : `${c.recruitment.fee} 元/学年`) },
    {
      label: "考核方式",
      get: (c) =>
        c.recruitment.assessment === "none"
          ? "无"
          : c.recruitment.assessment === "both"
            ? "笔试与面试"
            : c.recruitment.assessment === "written"
              ? "笔试"
              : "面试",
    },
    { label: "第二课堂学分", get: (c) => (c.recruitment.credits ? "可认定" : "无") },
    { label: "报名截止", get: (c) => c.deadline },
  ];

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">志愿对比</h1>
        <p className="page-lead">最多添加三个社团；可在各社团主页加入或移出对比清单。</p>
      </header>

      {clubs.length === 0 ? (
        <p className="text-body">
          当前对比清单为空。
          <Link to="/student/discover" className="link-inline" style={{ marginLeft: "0.35rem" }}>
            前往社团检索
          </Link>
        </p>
      ) : (
        <div style={{ overflowX: "auto" }} className="section-block">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 520,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow)",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontSize: "0.8125rem", color: "var(--muted)" }}>对比项</th>
                {clubs.map((c) => (
                  <th key={c.id} style={{ padding: "0.75rem", fontSize: "0.9375rem", verticalAlign: "top", fontWeight: 700 }}>
                    {c.name}
                    <button
                      type="button"
                      className="btn btn-ghost"
                      style={{ fontSize: "0.75rem", display: "block", margin: "0.35rem auto 0", padding: 0 }}
                      onClick={() => toggleCompare(c.id)}
                    >
                      移出
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "0.6rem 0.75rem", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 600 }}>
                    {row.label}
                  </td>
                  {clubs.map((c) => (
                    <td key={c.id} style={{ padding: "0.6rem 0.75rem", fontSize: "0.875rem" }}>
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
