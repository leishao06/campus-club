import { useApp } from "@/context/AppContext";
import type { ApplicationStatus } from "@/types";

const ACTIONS: { next: ApplicationStatus; label: string }[] = [
  { next: "accepted", label: "标记已受理" },
  { next: "written", label: "进入笔试" },
  { next: "interview", label: "进入面试" },
  { next: "pending", label: "待录取" },
  { next: "rejected", label: "拒绝" },
];

export default function ClubApplications() {
  const { applications, advanceApplication } = useApp();

  return (
    <div>
      <h1>报名与录取</h1>
      <p className="muted">批量操作与导出可在正式版扩展；此处演示状态流转。</p>

      {applications.length === 0 ? (
        <p className="muted">暂无报名数据。</p>
      ) : (
        <div className="stack" style={{ marginTop: "1rem" }}>
          {applications.map((app) => (
            <div key={app.id} className="card stack">
              <div>
                <strong>{app.clubName}</strong>
                <span className="muted" style={{ marginLeft: "0.5rem" }}>
                  学号档案已加密演示 · 投递 {app.submittedAt}
                </span>
              </div>
              <p style={{ margin: 0 }}>
                当前状态：<span className="badge">{app.status}</span> · 匹配度 {app.matchScore}%
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {ACTIONS.map((a) => (
                  <button
                    key={a.next}
                    type="button"
                    className="btn btn-secondary"
                    style={{ fontSize: "0.8rem" }}
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
