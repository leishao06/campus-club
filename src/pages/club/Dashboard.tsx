import { useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { CLUBS } from "@/data/clubs";

export default function ClubDashboard() {
  const { applications } = useApp();

  const byClub = useMemo(() => {
    const map = new Map<string, typeof applications>();
    applications.forEach((a) => {
      if (!map.has(a.clubId)) map.set(a.clubId, []);
      map.get(a.clubId)!.push(a);
    });
    return map;
  }, [applications]);

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">工作台</h1>
        <p className="page-lead">查看招新报名概况；报名明细与状态处理请进入「报名与录取」。</p>
      </header>

      <div className="grid grid-3 section-block">
        <div className="card">
          <h2 className="section-title" style={{ marginTop: 0, fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 700 }}>
            平台登记社团数
          </h2>
          <p style={{ fontSize: "1.75rem", margin: 0, fontWeight: 700 }}>{CLUBS.length}</p>
        </div>
        <div className="card">
          <h2 className="section-title" style={{ marginTop: 0, fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 700 }}>
            累计投递人次
          </h2>
          <p style={{ fontSize: "1.75rem", margin: 0, fontWeight: 700 }}>{applications.length}</p>
        </div>
        <div className="card">
          <h2 className="section-title" style={{ marginTop: 0, fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 700 }}>
            待受理报名
          </h2>
          <p style={{ fontSize: "1.75rem", margin: 0, fontWeight: 700 }}>
            {applications.filter((a) => a.status === "submitted").length}
          </p>
        </div>
      </div>

      <section className="card stack section-block">
        <h2 className="section-title">各社团投递分布</h2>
        {byClub.size === 0 ? (
          <p className="muted" style={{ margin: 0 }}>
            暂无报名数据。学生端投递后，此处将按社团汇总。
          </p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
            {[...byClub.entries()].map(([clubId, apps]) => {
              const name = CLUBS.find((c) => c.id === clubId)?.name ?? clubId;
              return (
                <li key={clubId} className="text-body">
                  <strong>{name}</strong>：{apps.length} 人次
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
