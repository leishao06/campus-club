import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import type { ApplicationStatus } from "@/types";

const STEPS: { key: ApplicationStatus; label: string }[] = [
  { key: "submitted", label: "已投递" },
  { key: "accepted", label: "已受理" },
  { key: "written", label: "笔试" },
  { key: "interview", label: "面试" },
  { key: "pending", label: "待录取" },
  { key: "rejected", label: "已结束" },
];

function stepIndex(s: ApplicationStatus): number {
  const order: ApplicationStatus[] = [
    "submitted",
    "accepted",
    "written",
    "interview",
    "pending",
    "rejected",
  ];
  const i = order.indexOf(s);
  return i < 0 ? 0 : i;
}

export default function Applications() {
  const { applications } = useApp();

  return (
    <div>
      <h1>我的报名</h1>
      <p className="muted">全节点进度为演示状态；真实环境将对接消息推送。</p>

      {applications.length === 0 ? (
        <p>
          暂无投递。<Link to="/student/discover">去发现</Link>
        </p>
      ) : (
        <div className="stack" style={{ marginTop: "1rem" }}>
          {applications.map((app) => {
            const idx = stepIndex(app.status);
            return (
              <div key={app.id} className="card stack">
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <strong>{app.clubName}</strong>
                    <span className="muted" style={{ marginLeft: "0.5rem" }}>
                      投递 {app.submittedAt} · 匹配 {app.matchScore}%
                    </span>
                  </div>
                  <Link to={`/student/club/${app.clubId}`}>社团主页</Link>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", alignItems: "center" }}>
                  {STEPS.map((st, i) => (
                    <span
                      key={st.key}
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.2rem 0.5rem",
                        borderRadius: 6,
                        background: i <= idx ? "var(--brand-soft)" : "#f1f5f9",
                        color: i <= idx ? "var(--brand)" : "var(--muted)",
                        fontWeight: i === idx ? 700 : 500,
                      }}
                    >
                      {st.label}
                    </span>
                  ))}
                </div>
                <p className="muted" style={{ margin: 0, fontSize: "0.85rem" }}>
                  当前状态：
                  <strong>
                    {app.status === "submitted"
                      ? "已投递，等待社团受理"
                      : app.status === "accepted"
                        ? "社团已受理"
                        : app.status === "written"
                          ? "请完成笔试"
                          : app.status === "interview"
                            ? "请预约/参加面试"
                            : app.status === "pending"
                              ? "待录取结果"
                              : app.status === "rejected"
                                ? "未录取"
                                : app.status}
                  </strong>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
