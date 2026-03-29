import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export default function Match() {
  const { matchResults, filterExplain, filteredOut, quickQuiz } = useApp();

  if (!quickQuiz) {
    return (
      <div>
        <h1>匹配结果</h1>
        <p className="muted">请先完成极速测评。</p>
        <Link to="/student/quiz" className="btn btn-primary">
          去测评
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>匹配结果</h1>
      <p className="muted">{filterExplain}</p>

      {filteredOut.length > 0 && (
        <details className="card" style={{ marginTop: "1rem" }}>
          <summary style={{ cursor: "pointer", fontWeight: 600 }}>
            因硬性条件未进入列表的社团（{filteredOut.length}）
          </summary>
          <ul className="muted" style={{ marginTop: "0.75rem" }}>
            {filteredOut.map(({ club, reason }) => (
              <li key={club.id}>
                <strong>{club.name}</strong>：{reason}
              </li>
            ))}
          </ul>
        </details>
      )}

      <div className="stack" style={{ marginTop: "1.25rem" }}>
        {matchResults.map(({ club, score, reason }) => (
          <article key={club.id} className="card stack">
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <div>
                <span className="badge">{club.categoryLabel}</span>
                <h2 style={{ fontSize: "1.15rem", marginTop: "0.5rem" }}>{club.name}</h2>
                <p className="muted" style={{ margin: 0 }}>
                  匹配度 <strong style={{ color: "var(--brand)" }}>{score}%</strong> · 热度 {club.heat}
                </p>
              </div>
              <Link to={`/student/club/${club.id}`} className="btn btn-primary">
                查看主页
              </Link>
            </div>
            <p style={{ margin: 0, fontSize: "0.95rem" }}>{reason}</p>
          </article>
        ))}
      </div>

      <p style={{ marginTop: "1.5rem" }}>
        <Link to="/student/discover">在发现页继续筛选 →</Link>
      </p>
    </div>
  );
}
