import { useApp } from "@/context/AppContext";
import { CLUBS } from "@/data/clubs";

export default function SchoolDashboard() {
  const { applications } = useApp();

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">招新数据总览</h1>
        <p className="page-lead">当前招新季：2026-09-20 至 10-25 · 社团会费须经社联审核并公示后方可收取</p>
      </header>

      <div className="grid grid-3 section-block">
        <div className="card">
          <h2 className="section-title" style={{ marginTop: 0, fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 700 }}>
            登记社团数
          </h2>
          <p style={{ fontSize: "1.75rem", margin: 0, fontWeight: 700 }}>{CLUBS.length}</p>
        </div>
        <div className="card">
          <h2 className="section-title" style={{ marginTop: 0, fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 700 }}>
            报名总人次
          </h2>
          <p style={{ fontSize: "1.75rem", margin: 0, fontWeight: 700 }}>{applications.length}</p>
        </div>
        <div className="card">
          <h2 className="section-title" style={{ marginTop: 0, fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 700 }}>
            处于「待录取」环节
          </h2>
          <p style={{ fontSize: "1.75rem", margin: 0, fontWeight: 700 }}>
            {applications.filter((a) => a.status === "pending").length}
          </p>
        </div>
      </div>

      <section className="card stack section-block">
        <h2 className="section-title">按类别社团数量</h2>
        <ul style={{ margin: 0, columns: 2, paddingLeft: "1.2rem" }}>
          {["学术科技", "文艺体育", "志愿公益", "创新创业", "兴趣爱好"].map((label) => (
            <li key={label} className="text-body">
              {label}：{CLUBS.filter((c) => c.categoryLabel === label).length}
            </li>
          ))}
        </ul>
      </section>

      <section className="card section-block">
        <h2 className="section-title">招新管理规则（摘要）</h2>
        <ul className="muted" style={{ margin: 0 }}>
          <li>简章与招新宣传须在统一招新窗口内发布；提前招新由系统预警并纳入监管（需对接正式环境）。</li>
          <li>社团动态与社员评价实行机审与人审相结合。</li>
        </ul>
      </section>
    </div>
  );
}
