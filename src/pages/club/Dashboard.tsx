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
      <h1>工作台</h1>
      <p className="muted">演示：可处理所有已投递本平台的报名（多社团视角）。</p>

      <div className="grid grid-3" style={{ marginTop: "1.25rem" }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>本校社团数</h3>
          <p style={{ fontSize: "2rem", margin: 0, fontWeight: 700 }}>{CLUBS.length}</p>
          <p className="muted" style={{ margin: 0 }}>
            演示数据
          </p>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>累计投递（本机）</h3>
          <p style={{ fontSize: "2rem", margin: 0, fontWeight: 700 }}>{applications.length}</p>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>待处理</h3>
          <p style={{ fontSize: "2rem", margin: 0, fontWeight: 700 }}>
            {applications.filter((a) => a.status === "submitted").length}
          </p>
        </div>
      </div>

      <div className="card stack" style={{ marginTop: "1.25rem" }}>
        <h3 style={{ marginTop: 0 }}>按社团投递分布</h3>
        {byClub.size === 0 ? (
          <p className="muted">暂无投递。请在新生端投递后刷新。</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
            {[...byClub.entries()].map(([clubId, apps]) => {
              const name = CLUBS.find((c) => c.id === clubId)?.name ?? clubId;
              return (
                <li key={clubId}>
                  <strong>{name}</strong>：{apps.length} 人
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
