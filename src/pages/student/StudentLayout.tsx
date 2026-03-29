import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

const links = [
  { to: "/student/home", label: "首页" },
  { to: "/student/quiz", label: "极速测评" },
  { to: "/student/match", label: "匹配结果" },
  { to: "/student/discover", label: "社团检索" },
  { to: "/student/applications", label: "我的报名" },
  { to: "/student/compare", label: "对比" },
  { to: "/student/profile", label: "档案" },
  { to: "/student/messages", label: "消息" },
];

export default function StudentLayout() {
  const { role, setRole } = useApp();
  const navigate = useNavigate();
  if (!role) return <Navigate to="/" replace />;
  if (role !== "student") return <Navigate to="/" replace />;

  function switchRole() {
    setRole(null);
    navigate("/");
  }

  return (
    <div className="shell">
      <header className="topbar">
        <NavLink to="/student/home" className="brand-mark">
          <span className="brand-dot" />
          学生端 · 招新服务
        </NavLink>
        <nav className="nav">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? "active" : "")}
              end={l.to === "/student/home"}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="btn btn-secondary" style={{ fontSize: "0.85rem" }} onClick={switchRole}>
          切换身份
        </button>
      </header>
      <Outlet />
    </div>
  );
}
