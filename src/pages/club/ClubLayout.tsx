import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export default function ClubLayout() {
  const { role, setRole } = useApp();
  const navigate = useNavigate();
  if (!role) return <Navigate to="/" replace />;
  if (role !== "club") return <Navigate to="/" replace />;

  function switchRole() {
    setRole(null);
    navigate("/");
  }

  return (
    <div className="shell">
      <header className="topbar">
        <NavLink to="/club/dashboard" className="brand-mark">
          <span className="brand-dot" />
          社团管理端
        </NavLink>
        <nav className="nav">
          <NavLink to="/club/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            工作台
          </NavLink>
          <NavLink to="/club/applications" className={({ isActive }) => (isActive ? "active" : "")}>
            报名与录取
          </NavLink>
        </nav>
        <button type="button" className="btn btn-secondary" style={{ fontSize: "0.85rem" }} onClick={switchRole}>
          切换身份
        </button>
      </header>
      <Outlet />
    </div>
  );
}
