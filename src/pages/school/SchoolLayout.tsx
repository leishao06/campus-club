import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export default function SchoolLayout() {
  const { role, setRole } = useApp();
  const navigate = useNavigate();
  if (!role) return <Navigate to="/" replace />;
  if (role !== "school") return <Navigate to="/" replace />;

  function switchRole() {
    setRole(null);
    navigate("/");
  }

  return (
    <div className="shell">
      <header className="topbar">
        <NavLink to="/school/dashboard" className="brand-mark">
          <span className="brand-dot" />
          校方监管端
        </NavLink>
        <nav className="nav">
          <NavLink to="/school/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            数据大屏
          </NavLink>
          <NavLink to="/school/complaints" className={({ isActive }) => (isActive ? "active" : "")}>
            投诉工单
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
