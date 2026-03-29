import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CLUBS } from "@/data/clubs";
import type { ClubCategory } from "@/types";
import { useApp } from "@/context/AppContext";

const CATS: { id: ClubCategory | "all"; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "academic", label: "学术科技" },
  { id: "arts_sports", label: "文艺体育" },
  { id: "volunteer", label: "志愿公益" },
  { id: "innovation", label: "创新创业" },
  { id: "hobby", label: "兴趣爱好" },
];

type SortKey = "match" | "heat" | "deadline";

export default function Discover() {
  const { matchResults, favorites, toggleFavorite, quickQuiz } = useApp();
  const [cat, setCat] = useState<ClubCategory | "all">("all");
  const [sort, setSort] = useState<SortKey>("match");
  const [q, setQ] = useState("");
  const [onlyEasy, setOnlyEasy] = useState(false);
  const [noFee, setNoFee] = useState(false);
  const [noInterview, setNoInterview] = useState(false);

  const scoreMap = useMemo(() => {
    const m = new Map<string, number>();
    matchResults.forEach((r) => m.set(r.club.id, r.score));
    return m;
  }, [matchResults]);

  const list = useMemo(() => {
    let rows = [...CLUBS];
    if (cat !== "all") rows = rows.filter((c) => c.category === cat);
    if (onlyEasy) rows = rows.filter((c) => c.beginnerFriendly);
    if (noFee) rows = rows.filter((c) => c.recruitment.fee === 0);
    if (noInterview)
      rows = rows.filter(
        (c) => c.recruitment.assessment === "none" || c.recruitment.assessment === "written"
      );
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      rows = rows.filter(
        (c) =>
          c.name.toLowerCase().includes(s) ||
          c.shortName.toLowerCase().includes(s) ||
          c.tags.some((t) => t.toLowerCase().includes(s))
      );
    }
    rows.sort((a, b) => {
      if (sort === "heat") return b.heat - a.heat;
      if (sort === "deadline") return a.deadline.localeCompare(b.deadline);
      return (scoreMap.get(b.id) ?? 50) - (scoreMap.get(a.id) ?? 50);
    });
    return rows;
  }, [cat, sort, q, onlyEasy, noFee, noInterview, scoreMap]);

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">社团检索</h1>
        <p className="page-lead">
          支持分类、排序、条件筛选与关键词检索。按匹配度排序时，将参考您已提交的测评结果
          {!quickQuiz && "（尚未测评时按系统默认画像估算匹配度）"}。
        </p>
      </header>

      <div className="card stack" style={{ marginTop: "0.25rem" }}>
        <div className="search-field">
          <input
            type="search"
            placeholder="检索社团名称、简称或标签"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="检索社团"
          />
        </div>
        <div>
          <p className="section-label" style={{ marginBottom: "0.5rem" }}>
            分类
          </p>
          <div className="option-grid">
            {CATS.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`option-pill ${cat === c.id ? "selected" : ""}`}
                onClick={() => setCat(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div className="sort-field">
          <span>排序方式</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            <option value="match">匹配度</option>
            <option value="heat">关注度</option>
            <option value="deadline">报名截止时间</option>
          </select>
        </div>
        <div>
          <p className="section-label" style={{ marginBottom: "0.5rem" }}>
            常用条件
          </p>
          <div className="option-grid">
            <button
              type="button"
              className={`option-pill ${onlyEasy ? "selected" : ""}`}
              onClick={() => setOnlyEasy((v) => !v)}
            >
              零基础友好
            </button>
            <button
              type="button"
              className={`option-pill ${noFee ? "selected" : ""}`}
              onClick={() => setNoFee((v) => !v)}
            >
              无会费
            </button>
            <button
              type="button"
              className={`option-pill ${noInterview ? "selected" : ""}`}
              onClick={() => setNoInterview((v) => !v)}
            >
              无面试（笔试或免测）
            </button>
          </div>
        </div>
      </div>

      <div className="stack section-block">
        {list.map((c) => (
          <div
            key={c.id}
            className="card"
            style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
          >
            <div>
              <span className="tag">{c.categoryLabel}</span>
              <h2 className="section-title" style={{ margin: "0.4rem 0 0", fontSize: "1.02rem" }}>
                {c.name}
              </h2>
              <p className="muted" style={{ margin: "0.2rem 0 0" }}>
                匹配度 {scoreMap.get(c.id) ?? "—"} · 报名截止 {c.deadline} · 周均投入约 {c.weeklyHours} 小时
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ fontSize: "0.8125rem" }}
                onClick={() => toggleFavorite(c.id)}
              >
                {favorites.includes(c.id) ? "已收藏" : "收藏"}
              </button>
              <Link to={`/student/club/${c.id}`} className="btn btn-primary" style={{ fontSize: "0.8125rem" }}>
                查看详情
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
