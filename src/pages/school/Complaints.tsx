import { useApp } from "@/context/AppContext";

export default function SchoolComplaints() {
  const { complaints, updateComplaint } = useApp();

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">投诉与舆情处理</h1>
        <p className="page-lead">工单一般流程：已提交 — 处理中 — 已结案；全程留痕备查。</p>
      </header>

      <div className="stack section-block">
        {complaints.map((c) => (
          <div key={c.id} className="card stack">
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <strong className="text-body">{c.title}</strong>
              <span className="badge">{c.status}</span>
            </div>
            <p className="muted" style={{ margin: 0, fontSize: "0.875rem" }}>
              来源 {c.from} · 涉及对象 {c.target} · {c.createdAt}
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ fontSize: "0.8125rem" }}
                onClick={() => updateComplaint(c.id, "processing")}
              >
                受理
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ fontSize: "0.8125rem" }}
                onClick={() => updateComplaint(c.id, "closed")}
              >
                结案
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
