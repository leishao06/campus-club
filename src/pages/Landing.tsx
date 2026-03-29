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
      <div className="hero">
        <p className="muted" style={{ marginBottom: "0.5rem" }}>
          产品演示 · 基于 PRD 可交互原型
        </p>
        <h1>社团招新智能匹配平台</h1>
        <p className="muted" style={{ maxWidth: "36rem" }}>
          兴趣测评、三层匹配模型、社团主页六模块、一键多投与进度追踪、社团与校方管理端——以下为前端演示数据，状态保存在本机浏览器。
        </p>
      </div>

      <div className="grid grid-3" style={{ marginTop: "2rem" }}>
        <button
          type="button"
          className="card"
          style={{ textAlign: "left", cursor: "pointer" }}
          onClick={() => go("student")}
        >
          <div className="badge">C 端</div>
          <h3 style={{ marginTop: "0.75rem" }}>新生端</h3>
          <p className="muted">极速/深度测评、匹配结果、发现与筛选、档案投递、进度与对比</p>
        </button>
        <button
          type="button"
          className="card"
          style={{ textAlign: "left", cursor: "pointer" }}
          onClick={() => go("club")}
        >
          <div className="badge" style={{ background: "#ccfbf1", color: "#0f766e" }}>
            社团
          </div>
          <h3 style={{ marginTop: "0.75rem" }}>社团管理端</h3>
          <p className="muted">招新看板、报名列表、录取操作、数据概览</p>
        </button>
        <button
          type="button"
          className="card"
          style={{ textAlign: "left", cursor: "pointer" }}
          onClick={() => go("school")}
        >
          <div className="badge" style={{ background: "#fef3c7", color: "#b45309" }}>
            校方
          </div>
          <h3 style={{ marginTop: "0.75rem" }}>校方 / 社联</h3>
          <p className="muted">全校数据大屏、招新季规则、投诉工单处理</p>
        </button>
      </div>

      <p style={{ marginTop: "2rem" }}>
        <button type="button" className="btn btn-ghost" onClick={resetDemo}>
          清除本地演示数据
        </button>
      </p>
    </div>
  );
}
