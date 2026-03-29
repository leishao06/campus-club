import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export default function Match() {
  const { matchResults, filterExplain, filteredOut, quickQuiz } = useApp();

  if (!quickQuiz) {
    return (
      <div>
        <header className="page-header">
          <h1 className="page-title">匹配结果</h1>
          <p className="page-lead">请先完成极速测评，系统将生成推荐列表。</p>
        </header>
        <Link to="/student/quiz" className="btn btn-primary">
          前往极速测评
        </Link>
      </div>
    );
  }

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">匹配结果</h1>
        <p className="page-lead">{filterExplain}</p>
      </header>

      {filteredOut.length > 0 && (
        <details className="card" style={{ marginTop: "0.5rem" }}>
          <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "0.9375rem" }}>
            未纳入本列表的社团（{filteredOut.length}）
          </summary>
          <p className="form-hint" style={{ marginTop: "0.65rem" }}>
            以下社团因与您在测评中勾选的硬性条件不符，已从推荐中排除。
          </p>
          <ul className="muted" style={{ margin: "0.5rem 0 0", paddingLeft: "1.2rem" }}>
            {filteredOut.map(({ club, reason }) => (
              <li key={club.id}>
                <strong>{club.name}</strong>：{reason}
              </li>
            ))}
          </ul>
        </details>
      )}

      <div className="stack section-block">
        {matchResults.map(({ club, score, reason }) => (
          <article key={club.id} className="card stack">
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div>
                <span className="badge">{club.categoryLabel}</span>
                <h2 className="section-title" style={{ marginTop: "0.5rem", fontSize: "1.0625rem" }}>
                  {club.name}
                </h2>
                <p className="muted" style={{ margin: 0 }}>
                  匹配度 <strong style={{ color: "var(--brand)" }}>{score}%</strong>
                  <span style={{ marginLeft: "0.5rem" }}>关注度 {club.heat}</span>
                </p>
              </div>
              <Link to={`/student/club/${club.id}`} className="btn btn-primary">
                查看社团主页
              </Link>
            </div>
            <p className="text-body" style={{ margin: 0 }}>
              {reason}
            </p>
          </article>
        ))}
      </div>

      <p className="section-block" style={{ marginTop: "1.5rem" }}>
        <Link to="/student/discover" className="link-inline">
          进入社团检索与筛选
        </Link>
      </p>
    </div>
  );
}
