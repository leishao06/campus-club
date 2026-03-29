import { useApp } from "@/context/AppContext";

export default function SchoolComplaints() {
  const { complaints, updateComplaint } = useApp();

  return (
    <div>
      <h1>投诉与风控</h1>
      <p className="muted">工单状态：已提交 → 处理中 → 已结案</p>

      <div className="stack" style={{ marginTop: "1rem" }}>
        {complaints.map((c) => (
          <div key={c.id} className="card stack">
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <strong>{c.title}</strong>
              <span className="badge">{c.status}</span>
            </div>
            <p className="muted" style={{ margin: 0 }}>
              来自 {c.from} · 对象 {c.target} · {c.createdAt}
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ fontSize: "0.8rem" }}
                onClick={() => updateComplaint(c.id, "processing")}
              >
                受理
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ fontSize: "0.8rem" }}
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
