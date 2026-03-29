import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { QuickQuizAnswers } from "@/types";
import { INTEREST_OPTIONS } from "@/data/clubs";
import { useApp } from "@/context/AppContext";

const defaultForm: QuickQuizAnswers = {
  weeklyHours: "2to5",
  goal: "skill",
  interest: [],
  interviewOk: true,
  feeOk: true,
};

export default function Quiz() {
  const { quickQuiz, setQuickQuiz } = useApp();
  const nav = useNavigate();
  const [form, setForm] = useState<QuickQuizAnswers>(quickQuiz ?? defaultForm);

  function toggleInterest(id: string) {
    setForm((f) => {
      const has = f.interest.includes(id);
      const interest = has ? f.interest.filter((x) => x !== id) : [...f.interest, id];
      return { ...f, interest: interest.slice(0, 4) };
    });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.interest.length === 0) {
      alert("请至少选择 1 个兴趣领域");
      return;
    }
    setQuickQuiz(form);
    nav("/student/match");
  }

  return (
    <div>
      <h1>极速测评（约 30 秒）</h1>
      <p className="muted">5 道选择题，完成即生成匹配报告。可随时重新测评。</p>

      <form onSubmit={submit} className="card stack" style={{ marginTop: "1.25rem" }}>
        <div className="field">
          <label>每周可投入社团的时间</label>
          <select
            value={form.weeklyHours}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                weeklyHours: e.target.value as QuickQuizAnswers["weeklyHours"],
              }))
            }
          >
            <option value="lte2">≤2 小时（轻松向）</option>
            <option value="2to5">约 2—5 小时</option>
            <option value="5plus">5 小时以上（可投入较多）</option>
          </select>
        </div>

        <div className="field">
          <label>入社核心目标</label>
          <select
            value={form.goal}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                goal: e.target.value as QuickQuizAnswers["goal"],
              }))
            }
          >
            <option value="skill">学技能 / 实践</option>
            <option value="social">社交与圈子</option>
            <option value="credits">第二课堂 / 学分</option>
            <option value="award">评奖与荣誉</option>
          </select>
        </div>

        <div className="field">
          <label>基础兴趣领域（多选，最多 4 项）</label>
          <div className="option-grid">
            {INTEREST_OPTIONS.map((o) => (
              <button
                key={o.id}
                type="button"
                className={`option-pill ${form.interest.includes(o.id) ? "selected" : ""}`}
                onClick={() => toggleInterest(o.id)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>是否接受面试 / 现场考核？</label>
          <div className="option-grid">
            <button
              type="button"
              className={`option-pill ${form.interviewOk ? "selected" : ""}`}
              onClick={() => setForm((f) => ({ ...f, interviewOk: true }))}
            >
              可以接受
            </button>
            <button
              type="button"
              className={`option-pill ${!form.interviewOk ? "selected" : ""}`}
              onClick={() => setForm((f) => ({ ...f, interviewOk: false }))}
            >
              希望无面试 / 仅线上
            </button>
          </div>
        </div>

        <div className="field">
          <label>是否接受会费？</label>
          <div className="option-grid">
            <button
              type="button"
              className={`option-pill ${form.feeOk ? "selected" : ""}`}
              onClick={() => setForm((f) => ({ ...f, feeOk: true }))}
            >
              可以接受公示后的会费
            </button>
            <button
              type="button"
              className={`option-pill ${!form.feeOk ? "selected" : ""}`}
              onClick={() => setForm((f) => ({ ...f, feeOk: false }))}
            >
              仅考虑零会费社团
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button type="submit" className="btn btn-primary">
            生成匹配报告
          </button>
          <Link to="/student/home" className="btn btn-secondary">
            返回
          </Link>
        </div>
      </form>
    </div>
  );
}
