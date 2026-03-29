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
      <h1>发现社团</h1>
      <p className="muted">
        支持分类、排序、标签筛选与搜索；排序为「匹配度」时依赖测评结果
        {!quickQuiz && "（尚未测评时按内置默认画像估算）"}。
      </p>

      <div className="card stack" style={{ marginTop: "1rem" }}>
        <input
          type="search"
          placeholder="搜索社团名、标签…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: 8, border: "1px solid var(--border)" }}
        />
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
          <label className="muted" style={{ fontSize: "0.85rem" }}>
            排序：
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              <option value="match">匹配度</option>
              <option value="heat">热度</option>
              <option value="deadline">截止早→晚</option>
            </select>
          </label>
        </div>
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
            无面试（仅笔试/无考核）
          </button>
        </div>
      </div>

      <div className="stack" style={{ marginTop: "1rem" }}>
        {list.map((c) => (
          <div key={c.id} className="card" style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <span className="tag">{c.categoryLabel}</span>
              <h3 style={{ margin: "0.35rem 0 0", fontSize: "1.05rem" }}>{c.name}</h3>
              <p className="muted" style={{ margin: "0.25rem 0 0", fontSize: "0.88rem" }}>
                匹配 {scoreMap.get(c.id) ?? "—"} · 截止 {c.deadline} · 周均 {c.weeklyHours}h
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ fontSize: "0.8rem" }}
                onClick={() => toggleFavorite(c.id)}
              >
                {favorites.includes(c.id) ? "已收藏" : "收藏"}
              </button>
              <Link to={`/student/club/${c.id}`} className="btn btn-primary" style={{ fontSize: "0.85rem" }}>
                详情
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
