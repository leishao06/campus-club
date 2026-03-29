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

const statusLabel: Record<ApplicationStatus, string> = {
  submitted: "已投递，待社团受理",
  accepted: "社团已受理",
  written: "请按要求完成笔试",
  interview: "请参加面试或预约面试时段",
  pending: "评审中，待录取结果",
  rejected: "本轮未录取",
};

export default function Applications() {
  const { applications } = useApp();

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">我的报名</h1>
        <p className="page-lead">查看各志愿的处理进度；关键节点将通过系统消息进行通知。</p>
      </header>

      {applications.length === 0 ? (
        <p className="text-body">
          暂无报名记录。
          <Link to="/student/discover" className="link-inline" style={{ marginLeft: "0.35rem" }}>
            前往社团检索
          </Link>
        </p>
      ) : (
        <div className="stack section-block">
          {applications.map((app) => {
            const idx = stepIndex(app.status);
            return (
              <div key={app.id} className="card stack">
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <strong className="text-body">{app.clubName}</strong>
                    <span className="muted" style={{ marginLeft: "0.5rem" }}>
                      投递日期 {app.submittedAt} · 系统评估匹配度 {app.matchScore}%
                    </span>
                  </div>
                  <Link to={`/student/club/${app.clubId}`} className="link-inline">
                    社团主页
                  </Link>
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
                <p className="muted" style={{ margin: 0, fontSize: "0.875rem" }}>
                  当前状态：{statusLabel[app.status]}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
