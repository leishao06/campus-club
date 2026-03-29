import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export default function StudentHome() {
  const { quickQuiz, filterExplain, matchResults } = useApp();

  return (
    <div>
      <div className="hero">
        <h1>你好，招新季开始了</h1>
        <p className="muted">
          先用 <strong>30 秒极速测评</strong> 完成冷启动，查看 Top 匹配社团；需要更准可再做深度测评。
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
          <Link to="/student/quiz" className="btn btn-primary">
            {quickQuiz ? "重新测评" : "开始极速测评"}
          </Link>
          <Link to="/student/discover" className="btn btn-secondary">
            直接去发现
          </Link>
          <Link to="/student/quiz/deep" className="btn btn-secondary">
            深度测评（约 2 分钟）
          </Link>
        </div>
      </div>

      <div className="grid grid-2" style={{ marginTop: "2rem" }}>
        <div className="card stack">
          <h3>招新季日历</h3>
          <ul className="muted" style={{ margin: 0, paddingLeft: "1.2rem" }}>
            <li>全校招新窗口：2026-09-20 — 10-25</li>
            <li>社团联合宣讲：09-25 晚</li>
            <li>笔试集中日：10-08、10-12</li>
          </ul>
        </div>
        <div className="card stack">
          <h3>官方提示</h3>
          <p className="muted" style={{ margin: 0 }}>
            会费仅可在社联审核公示后收取；若遇虚假宣传或强制消费，请通过消息中心旁的投诉入口反馈。
          </p>
        </div>
      </div>

      {quickQuiz && (
        <div className="card stack" style={{ marginTop: "1rem" }}>
          <h3>当前匹配摘要</h3>
          <p className="muted">{filterExplain}</p>
          <p>
            <strong>推荐首位：</strong>
            {matchResults[0]?.club.name}（{matchResults[0]?.score}%）
          </p>
          <Link to="/student/match">查看完整匹配列表 →</Link>
        </div>
      )}
    </div>
  );
}
