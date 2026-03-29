import { useApp } from "@/context/AppContext";
import type { ApplicationStatus } from "@/types";

const ACTIONS: { next: ApplicationStatus; label: string }[] = [
  { next: "accepted", label: "标记已受理" },
  { next: "written", label: "进入笔试环节" },
  { next: "interview", label: "进入面试环节" },
  { next: "pending", label: "进入待录取" },
  { next: "rejected", label: "不予录取" },
];

export default function ClubApplications() {
  const { applications, advanceApplication } = useApp();

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">报名与录取</h1>
        <p className="page-lead">查看学生投递信息，推进各阶段状态；批量导出与自定义字段可在正式部署中对接。</p>
      </header>

      {applications.length === 0 ? (
        <p className="muted">暂无报名记录。</p>
      ) : (
        <div className="stack section-block">
          {applications.map((app) => (
            <div key={app.id} className="card stack">
              <div>
                <strong className="text-body">{app.clubName}</strong>
                <span className="muted" style={{ marginLeft: "0.5rem" }}>
                  投递日期 {app.submittedAt}
                </span>
              </div>
              <p style={{ margin: 0 }} className="text-body">
                当前状态：<span className="badge">{app.status}</span>
                <span style={{ marginLeft: "0.5rem" }}>系统匹配度参考 {app.matchScore}%</span>
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {ACTIONS.map((a) => (
                  <button
                    key={a.next}
                    type="button"
                    className="btn btn-secondary"
                    style={{ fontSize: "0.8125rem" }}
                    onClick={() => advanceApplication(app.id, a.next)}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
