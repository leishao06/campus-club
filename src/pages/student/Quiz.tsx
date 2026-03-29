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
      alert("请至少选择一项兴趣领域");
      return;
    }
    setQuickQuiz(form);
    nav("/student/match");
  }

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">极速测评</h1>
        <p className="page-lead">共 5 题，预计用时约 30 秒。提交后将生成匹配报告；可随时重新测评并覆盖上次结果。</p>
      </header>

      <form onSubmit={submit} className="card stack" style={{ marginTop: "0.25rem" }}>
        <div className="field">
          <label className="form-question" htmlFor="q-hours">
            每周可投入社团的时间
          </label>
          <p className="form-hint">用于筛选与您时间预期差异较大的社团</p>
          <select
            id="q-hours"
            value={form.weeklyHours}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                weeklyHours: e.target.value as QuickQuizAnswers["weeklyHours"],
              }))
            }
          >
            <option value="lte2">每周不超过 2 小时</option>
            <option value="2to5">每周约 2—5 小时</option>
            <option value="5plus">每周 5 小时以上</option>
          </select>
        </div>

        <div className="field">
          <label className="form-question" htmlFor="q-goal">
            入社核心目标
          </label>
          <select
            id="q-goal"
            value={form.goal}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                goal: e.target.value as QuickQuizAnswers["goal"],
              }))
            }
          >
            <option value="skill">技能提升与实践</option>
            <option value="social">社交与同伴</option>
            <option value="credits">第二课堂与学分认定</option>
            <option value="award">竞赛与荣誉</option>
          </select>
        </div>

        <div className="field">
          <span className="form-question">基础兴趣领域</span>
          <p className="form-hint">可多选，最多四项</p>
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
          <span className="form-question">是否接受面试或现场考核</span>
          <div className="option-grid">
            <button
              type="button"
              className={`option-pill ${form.interviewOk ? "selected" : ""}`}
              onClick={() => setForm((f) => ({ ...f, interviewOk: true }))}
            >
              接受
            </button>
            <button
              type="button"
              className={`option-pill ${!form.interviewOk ? "selected" : ""}`}
              onClick={() => setForm((f) => ({ ...f, interviewOk: false }))}
            >
              不接受（仅无面试或线上考核）
            </button>
          </div>
        </div>

        <div className="field">
          <span className="form-question">是否接受社团会费</span>
          <div className="option-grid">
            <button
              type="button"
              className={`option-pill ${form.feeOk ? "selected" : ""}`}
              onClick={() => setForm((f) => ({ ...f, feeOk: true }))}
            >
              接受经公示的会费
            </button>
            <button
              type="button"
              className={`option-pill ${!form.feeOk ? "selected" : ""}`}
              onClick={() => setForm((f) => ({ ...f, feeOk: false }))}
            >
              仅考虑不收取会费的社团
            </button>
          </div>
        </div>

        <div className="primary-actions" style={{ marginTop: "0.5rem" }}>
          <button type="submit" className="btn btn-primary">
            提交并生成匹配报告
          </button>
          <Link to="/student/home" className="btn btn-secondary">
            返回招新首页
          </Link>
        </div>
      </form>
    </div>
  );
}
