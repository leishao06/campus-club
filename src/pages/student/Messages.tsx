import { Link } from "react-router-dom";

const ITEMS = [
  { id: "1", title: "【系统】招新季窗口提醒", time: "2026-09-20 09:00", read: false },
  { id: "2", title: "【系统】你收藏的「街舞协会」即将截止报名", time: "2026-09-22 14:20", read: true },
];

export default function Messages() {
  return (
    <div>
      <h1>消息中心</h1>
      <p className="muted">演示静态列表；落地时可对接微信服务通知模板。</p>
      <div className="stack" style={{ marginTop: "1rem" }}>
        {ITEMS.map((m) => (
          <div key={m.id} className="card" style={{ opacity: m.read ? 0.85 : 1 }}>
            <strong>{m.title}</strong>
            <p className="muted" style={{ margin: "0.25rem 0 0", fontSize: "0.85rem" }}>
              {m.time}
            </p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: "1.5rem" }}>
        遇到问题？
        <Link to="/school/complaints">前往校方投诉工单（需切换身份）</Link>
      </p>
    </div>
  );
}
