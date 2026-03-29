import { Link } from "react-router-dom";

const ITEMS = [
  { id: "1", title: "【系统通知】全校招新窗口已开放", time: "2026-09-20 09:00", read: false },
  { id: "2", title: "【提醒】您收藏的社团即将截止报名", time: "2026-09-22 14:20", read: true },
];

export default function Messages() {
  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">消息中心</h1>
        <p className="page-lead">系统通知与业务提醒将集中展示于此；重要节点可同步至手机短信或企业微信（以学校开通渠道为准）。</p>
      </header>

      <div className="stack section-block">
        {ITEMS.map((m) => (
          <div key={m.id} className="card" style={{ opacity: m.read ? 0.88 : 1 }}>
            <strong className="text-body" style={{ fontSize: "0.9375rem" }}>
              {m.title}
            </strong>
            <p className="muted" style={{ margin: "0.35rem 0 0", fontSize: "0.8125rem" }}>
              {m.time}
            </p>
          </div>
        ))}
      </div>

      <p className="section-block text-body" style={{ marginTop: "1.5rem" }}>
        需要投诉或举报？
        <Link to="/school/complaints" className="link-inline" style={{ marginLeft: "0.35rem" }}>
          校方监管端 · 投诉处理
        </Link>
        <span className="muted" style={{ marginLeft: "0.35rem", fontSize: "0.8125rem" }}>
          （需先切换身份）
        </span>
      </p>
    </div>
  );
}
