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
      <p className="text-body">
        未找到该社团。
        <Link to="/student/discover" className="link-inline" style={{ marginLeft: "0.35rem" }}>
          返回社团检索
        </Link>
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
    setQa((prev) => [
      ...prev,
      {
        q: question.trim(),
        a: "社团招新组将在工作时间内回复；紧急事项请按简章说明加入招新群联系负责人。",
      },
    ]);
    setQuestion("");
  }

  return (
    <div>
      <p style={{ marginBottom: "1rem" }}>
        <Link to="/student/discover" className="link-inline">
          返回社团检索
        </Link>
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <span className="badge">{club.categoryLabel}</span>
          <h1 className="page-title" style={{ marginTop: "0.5rem" }}>
            {club.name}
          </h1>
          <p className="page-lead" style={{ marginTop: "0.35rem" }}>
            {match ? `系统评估匹配度 ${match.score}%` : "—"} · 计划招收 {club.recruitment.quota} 人 · 报名截止 {club.deadline}
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
              投递报名
            </button>
          ) : (
            <span className="tag">已投递</span>
          )}
        </div>
      </div>

      {match && (
        <div className="card text-body" style={{ marginTop: "1rem", fontSize: "0.9375rem" }}>
          {match.reason}
        </div>
      )}

      <div className="grid grid-2 section-block" style={{ marginTop: "1.5rem" }}>
        <section className="card stack">
          <h2 className="section-title">官方档案</h2>
          <p className="muted" style={{ margin: 0 }}>
            成立于 {club.official.founded}，主管单位 {club.official.supervisor}，登记规模约 {club.official.members}{" "}
            人。年审状态：{club.official.annualReview === "passed" ? "已通过" : "待定"}。
          </p>
          <p className="text-body" style={{ margin: 0 }}>
            <strong>主要荣誉：</strong>
            {club.official.honors.length ? club.official.honors.join("；") : "—"}
          </p>
        </section>

        <section className="card stack">
          <h2 className="section-title">招新简章</h2>
          <ul className="muted" style={{ margin: 0, paddingLeft: "1.2rem" }}>
            <li>部门设置：{club.recruitment.departments.join("、")}</li>
            <li>招新要求：{club.recruitment.requirements}</li>
            <li>
              考核方式：
              {club.recruitment.assessment === "none"
                ? "无"
                : club.recruitment.assessment === "both"
                  ? "笔试与面试"
                  : club.recruitment.assessment === "written"
                    ? "笔试"
                    : "面试"}
            </li>
            <li>
              会费：
              {club.recruitment.feeApproved
                ? club.recruitment.fee === 0
                  ? "无"
                  : `${club.recruitment.fee} 元/学年（已审核公示）`
                : "待审核"}
            </li>
            <li>第二课堂学分：{club.recruitment.credits ? "可按规定认定" : "无"}</li>
          </ul>
        </section>

        <section className="card stack">
          <h2 className="section-title">活动与宣传</h2>
          <ul className="text-body" style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.9375rem" }}>
            {club.dynamics.map((d) => (
              <li key={d.title}>
                [{d.type === "video" ? "视频" : "图文"}] {d.title} · {d.date}
              </li>
            ))}
          </ul>
          <p className="form-hint" style={{ margin: "0.5rem 0 0" }}>
            可配套活动室全景影像、招新宣讲直播回放等材料（由社团上传、校方审核后展示）。
          </p>
        </section>

        <section className="card stack">
          <h2 className="section-title">社员评价</h2>
          {club.reviews.map((r, i) => (
            <blockquote
              key={i}
              style={{ margin: "0 0 0.75rem", paddingLeft: "0.75rem", borderLeft: "3px solid var(--border)" }}
            >
              <p className="text-body" style={{ margin: 0 }}>
                {r.text}
              </p>
              <footer className="muted" style={{ fontSize: "0.8125rem" }}>
                {r.anonymous ? "匿名" : r.author} · {r.tags.join("、")}
              </footer>
            </blockquote>
          ))}
        </section>

        <section className="card stack">
          <h2 className="section-title">常见问题</h2>
          {club.faq.map((f) => (
            <div key={f.q}>
              <strong className="text-body">问：{f.q}</strong>
              <p className="muted" style={{ margin: "0.25rem 0 0" }}>
                答：{f.a}
              </p>
            </div>
          ))}
        </section>

        <section className="card stack">
          <h2 className="section-title">合规提示</h2>
          <ul className="muted" style={{ margin: 0 }}>
            {club.compliance.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
            {club.compliance.violations.length === 0 ? null : (
              <li style={{ color: "var(--danger)" }}>违规记录公示：{club.compliance.violations.join("；")}</li>
            )}
          </ul>
        </section>
      </div>

      <section className="card stack section-block">
        <h2 className="section-title">匿名咨询</h2>
        <p className="form-hint" style={{ margin: 0 }}>
          提问经审核后可公开展示于本页，供其他同学参考。请勿提交与招新无关或隐私敏感内容。
        </p>
        <form onSubmit={submitQA} className="stack" style={{ marginTop: "0.75rem" }}>
          <div className="field">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="简要描述您的问题，例如：零基础是否可以报名、考核具体安排等"
              rows={4}
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            提交问题
          </button>
        </form>
        {qa.map((item, i) => (
          <div key={i} style={{ borderTop: "1px solid var(--border)", paddingTop: "0.75rem" }}>
            <strong className="text-body">问：</strong>
            {item.q}
            <p className="muted" style={{ margin: "0.35rem 0 0" }}>
              <strong>答：</strong>
              {item.a}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
