import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export default function StudentHome() {
  const { quickQuiz, filterExplain, matchResults } = useApp();

  return (
    <div>
      <header className="page-header hero">
        <h1 className="page-title">招新首页</h1>
        <p className="page-lead">
          请先完成兴趣测评，系统将结合您的选项推荐匹配社团；您也可在测评前后浏览全部社团并投递报名。
        </p>

        <div className="section-block" style={{ marginTop: "1.35rem" }}>
          <p className="section-label">主要操作</p>
          <div className="primary-actions">
            <Link to="/student/quiz" className="btn btn-primary">
              {quickQuiz ? "重新进行极速测评" : "极速测评（约 30 秒）"}
            </Link>
            <Link to="/student/quiz/deep" className="btn btn-secondary">
              深度测评（约 2 分钟）
            </Link>
          </div>
        </div>

        <div className="secondary-actions">
          <p className="section-label">其他入口</p>
          <Link to="/student/discover" className="link-inline">
            浏览社团目录
          </Link>
        </div>
      </header>

      <div className="grid grid-2 section-block" style={{ marginTop: "2rem" }}>
        <section className="card stack">
          <h2 className="section-title">招新日程</h2>
          <ul className="muted" style={{ margin: 0, paddingLeft: "1.2rem" }}>
            <li>全校招新窗口：2026-09-20 至 10-25</li>
            <li>联合宣讲：09-25 晚间</li>
            <li>笔试集中安排：10-08、10-12</li>
          </ul>
        </section>
        <section className="card stack">
          <h2 className="section-title">合规提示</h2>
          <p className="muted" style={{ margin: 0 }}>
            会费须在社联审核并公示后方可收取。如发现虚假宣传或强制消费，可通过系统内投诉渠道反映。
          </p>
        </section>
      </div>

      {quickQuiz && (
        <section className="card stack section-block">
          <h2 className="section-title">当前匹配摘要</h2>
          <p className="muted" style={{ margin: 0 }}>
            {filterExplain}
          </p>
          <p className="text-body" style={{ margin: 0 }}>
            推荐首位：<strong>{matchResults[0]?.club.name}</strong>（匹配度 {matchResults[0]?.score}%）
          </p>
          <Link to="/student/match" className="link-inline">
            查看完整匹配列表
          </Link>
        </section>
      )}
    </div>
  );
}
