import { useApp } from "@/context/AppContext";
import { CLUBS } from "@/data/clubs";

export default function SchoolDashboard() {
  const { applications } = useApp();

  return (
    <div>
      <h1>全校招新数据（演示）</h1>
      <p className="muted">招新季：2026-09-20 — 10-25 · 会费须报备后公示</p>

      <div className="grid grid-3" style={{ marginTop: "1.25rem" }}>
        <div className="card">
          <h3 style={{ marginTop: 0, fontSize: "0.9rem", color: "var(--muted)" }}>注册社团</h3>
          <p style={{ fontSize: "2rem", margin: 0, fontWeight: 700 }}>{CLUBS.length}</p>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0, fontSize: "0.9rem", color: "var(--muted)" }}>报名人次（本机）</h3>
          <p style={{ fontSize: "2rem", margin: 0, fontWeight: 700 }}>{applications.length}</p>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0, fontSize: "0.9rem", color: "var(--muted)" }}>处于「待录取」节点</h3>
          <p style={{ fontSize: "2rem", margin: 0, fontWeight: 700 }}>
            {applications.filter((a) => a.status === "pending").length}
          </p>
          <p className="muted" style={{ margin: 0, fontSize: "0.75rem" }}>
            正式环境可对接录取库表
          </p>
        </div>
      </div>

      <div className="card stack" style={{ marginTop: "1.25rem" }}>
        <h3 style={{ marginTop: 0 }}>分类社团数</h3>
        <ul style={{ margin: 0, columns: 2, paddingLeft: "1.2rem" }}>
          {["学术科技", "文艺体育", "志愿公益", "创新创业", "兴趣爱好"].map((label) => (
            <li key={label}>
              {label}：{CLUBS.filter((c) => c.categoryLabel === label).length}
            </li>
          ))}
        </ul>
      </div>

      <div className="card" style={{ marginTop: "1rem" }}>
        <h3 style={{ marginTop: 0 }}>招新季规则</h3>
        <ul className="muted" style={{ margin: 0 }}>
          <li>统一招新窗口内发布简章，提前招新将触发预警（演示未开启）。</li>
          <li>社团动态与评价经机审+人审双通道（演示为静态说明）。</li>
        </ul>
      </div>
    </div>
  );
}
