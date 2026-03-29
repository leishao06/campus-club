import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CLUBS } from "@/data/clubs";
import { useApp } from "@/context/AppContext";

export default function ClubDetail() {
  const { id } = useParams();
  const club = CLUBS.find((c) => c.id === id);
  const { applyToClub, applications, favorites, toggleFavorite, toggleCompare, matchResults } =
    useApp();
  const [question, setQuestion] = useState("");
  const [qa, setQa] = useState<{ q: string; a: string }[]>([]);

  if (!club) {
    return (
      <p>
        未找到该社团。<Link to="/student/discover">返回发现</Link>
      </p>
    );
  }

  const applied = applications.some((a) => a.clubId === club.id);
  const match = matchResults.find((m) => m.club.id === club.id);

  function handleApply() {
    const r = applyToClub(club.id);
    alert(r.message);
  }

  function handleCompare() {
    const r = toggleCompare(club.id);
    alert(r.message);
  }

  function submitQA(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setQa((prev) => [...prev, { q: question.trim(), a: "【演示】社团将于 24 小时内回复，也可前往招新群咨询。" }]);
    setQuestion("");
  }

  return (
    <div>
      <p className="muted">
        <Link to="/student/discover">← 发现</Link>
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <span className="badge">{club.categoryLabel}</span>
          <h1 style={{ marginTop: "0.5rem" }}>{club.name}</h1>
          <p className="muted">
            {match ? `匹配度 ${match.score}%` : "—"} · 计划招新 {club.recruitment.quota} 人 · 报名截止 {club.deadline}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button type="button" className="btn btn-secondary" onClick={() => toggleFavorite(club.id)}>
            {favorites.includes(club.id) ? "已收藏" : "收藏"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCompare}>
            加入对比
          </button>
          {!applied ? (
            <button type="button" className="btn btn-primary" onClick={handleApply}>
              一键投递
            </button>
          ) : (
            <span className="tag">已投递</span>
          )}
        </div>
      </div>

      {match && (
        <p className="card" style={{ marginTop: "1rem", fontSize: "0.95rem" }}>
          {match.reason}
        </p>
      )}

      <div className="grid grid-2" style={{ marginTop: "1.5rem" }}>
        <section className="card stack">
          <h3>官方档案</h3>
          <p className="muted" style={{ margin: 0 }}>
            成立于 {club.official.founded}，主管 {club.official.supervisor}，规模约 {club.official.members}{" "}
            人。年审：{club.official.annualReview === "passed" ? "已通过" : "待定"}。
          </p>
          <p style={{ margin: 0 }}>
            <strong>荣誉：</strong>
            {club.official.honors.length ? club.official.honors.join("；") : "—"}
          </p>
        </section>

        <section className="card stack">
          <h3>招新简章</h3>
          <ul className="muted" style={{ margin: 0, paddingLeft: "1.2rem" }}>
            <li>部门：{club.recruitment.departments.join("、")}</li>
            <li>要求：{club.recruitment.requirements}</li>
            <li>
              考核：
              {club.recruitment.assessment === "none"
                ? "无"
                : club.recruitment.assessment === "both"
                  ? "笔试+面试"
                  : club.recruitment.assessment === "written"
                    ? "笔试"
                    : "面试"}
            </li>
            <li>
              会费：
              {club.recruitment.feeApproved
                ? club.recruitment.fee === 0
                  ? "无"
                  : `${club.recruitment.fee} 元/年（已审核公示）`
                : "待审核"}
            </li>
            <li>第二课堂学分：{club.recruitment.credits ? "可认定" : "无"}</li>
          </ul>
        </section>

        <section className="card stack">
          <h3>真实动态</h3>
          <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
            {club.dynamics.map((d) => (
              <li key={d.title}>
                [{d.type === "video" ? "视频" : "图文"}] {d.title} · {d.date}
              </li>
            ))}
          </ul>
          <p className="muted" style={{ margin: 0 }}>
            云逛：演示环境可扩展 360° 全景与直播回放。
          </p>
        </section>

        <section className="card stack">
          <h3>社员口碑</h3>
          {club.reviews.map((r, i) => (
            <blockquote key={i} style={{ margin: "0 0 0.75rem", paddingLeft: "0.75rem", borderLeft: "3px solid var(--border)" }}>
              <p style={{ margin: 0 }}>{r.text}</p>
              <footer className="muted" style={{ fontSize: "0.85rem" }}>
                {r.anonymous ? "匿名" : r.author} · {r.tags.join("、")}
              </footer>
            </blockquote>
          ))}
        </section>

        <section className="card stack">
          <h3>常见 QA</h3>
          {club.faq.map((f) => (
            <div key={f.q}>
              <strong>Q：{f.q}</strong>
              <p className="muted">A：{f.a}</p>
            </div>
          ))}
        </section>

        <section className="card stack">
          <h3>官方避坑提示</h3>
          <ul className="muted" style={{ margin: 0 }}>
            {club.compliance.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
            {club.compliance.violations.length === 0 ? null : (
              <li style={{ color: "var(--danger)" }}>违规记录：{club.compliance.violations.join("；")}</li>
            )}
          </ul>
        </section>
      </div>

      <section className="card stack" style={{ marginTop: "1rem" }}>
        <h3>匿名咨询</h3>
        <p className="muted">提问将公开展示在主页，供其他同学参考（演示）。</p>
        <form onSubmit={submitQA} className="stack">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="例如：零基础需要准备什么？"
            style={{ width: "100%", minHeight: 72, borderRadius: 8, border: "1px solid var(--border)", padding: "0.5rem" }}
          />
          <button type="submit" className="btn btn-secondary">
            提交提问
          </button>
        </form>
        {qa.map((item, i) => (
          <div key={i} style={{ borderTop: "1px solid var(--border)", paddingTop: "0.75rem" }}>
            <strong>问：</strong>
            {item.q}
            <p className="muted" style={{ margin: "0.25rem 0 0" }}>
              <strong>答：</strong>
              {item.a}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
