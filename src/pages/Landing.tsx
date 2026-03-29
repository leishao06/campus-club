import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export default function Landing() {
  const { setRole, resetDemo } = useApp();
  const nav = useNavigate();

  function go(role: "student" | "club" | "school") {
    setRole(role);
    if (role === "student") nav("/student/home");
    if (role === "club") nav("/club/dashboard");
    if (role === "school") nav("/school/dashboard");
  }

  return (
    <div className="shell">
      <header className="page-header" style={{ marginBottom: "2rem" }}>
        <h1 className="page-title">社团招新智能匹配平台</h1>
        <p className="page-lead">兴趣测评与智能推荐、社团招新报名、校方招新监管的一体化服务入口。</p>
      </header>

      <div className="portal-grid">
        <button type="button" className="portal-card" onClick={() => go("student")}>
          <span className="portal-role portal-role--student">学生</span>
          <h2 className="portal-card-title">学生端</h2>
          <p className="portal-card-desc">兴趣测评、匹配结果、社团检索与筛选、统一档案投递、报名进度查询</p>
        </button>
        <button type="button" className="portal-card" onClick={() => go("club")}>
          <span className="portal-role portal-role--club">社团</span>
          <h2 className="portal-card-title">社团管理端</h2>
          <p className="portal-card-desc">招新工作台、报名审核、考核与录取、招新数据统计</p>
        </button>
        <button type="button" className="portal-card" onClick={() => go("school")}>
          <span className="portal-role portal-role--school">校方</span>
          <h2 className="portal-card-title">校方监管端</h2>
          <p className="portal-card-desc">全校招新数据、招新季规则、内容审核与投诉处理</p>
        </button>
      </div>

      <footer className="landing-footer">
        <p className="landing-footer-note">如需清空本设备已填写的测评与报名记录，可使用下方操作。</p>
        <button type="button" className="btn btn-ghost" style={{ marginTop: "0.35rem", paddingLeft: 0 }} onClick={resetDemo}>
          清除本地数据
        </button>
      </footer>
    </div>
  );
}
