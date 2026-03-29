import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { DeepQuizAnswers } from "@/types";
import { useApp } from "@/context/AppContext";

const empty: DeepQuizAnswers = {
  skills: "",
  experience: "",
  career: "",
  personality: "balanced",
  budgetHours: 3,
};

export default function DeepQuiz() {
  const { deepQuiz, setDeepQuiz, setQuickQuiz, quickQuiz } = useApp();
  const nav = useNavigate();
  const [form, setForm] = useState<DeepQuizAnswers>(deepQuiz ?? empty);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setDeepQuiz(form);
    if (!quickQuiz) {
      setQuickQuiz({
        weeklyHours: "2to5",
        goal: "skill",
        interest: ["media"],
        interviewOk: true,
        feeOk: true,
      });
    }
    nav("/student/match");
  }

  return (
    <div>
      <h1>深度测评（约 2 分钟）</h1>
      <p className="muted">补充信息后，匹配结果会重新排序并生成更细的推荐理由。</p>

      <form onSubmit={submit} className="card stack" style={{ marginTop: "1.25rem" }}>
        <div className="field">
          <label>特长与技能</label>
          <textarea
            value={form.skills}
            onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
            placeholder="如：Pr 剪辑、Python、主持…"
          />
        </div>
        <div className="field">
          <label>过往相关经历</label>
          <textarea
            value={form.experience}
            onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
            placeholder="如：高中文学社、志愿活动…"
          />
        </div>
        <div className="field">
          <label>职业规划（简答）</label>
          <textarea
            value={form.career}
            onChange={(e) => setForm((f) => ({ ...f, career: e.target.value }))}
            placeholder="如：希望从事产品/媒体/科研…"
          />
        </div>
        <div className="field">
          <label>性格倾向</label>
          <select
            value={form.personality}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                personality: e.target.value as DeepQuizAnswers["personality"],
              }))
            }
          >
            <option value="outgoing">外向协作</option>
            <option value="balanced">均衡</option>
            <option value="calm">安静深耕</option>
          </select>
        </div>
        <div className="field">
          <label>本学期愿投入的社团时间（小时/周）：{form.budgetHours}</label>
          <input
            type="range"
            min={1}
            max={12}
            value={form.budgetHours}
            onChange={(e) => setForm((f) => ({ ...f, budgetHours: Number(e.target.value) }))}
          />
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button type="submit" className="btn btn-primary">
            更新匹配方案
          </button>
          <Link to="/student/quiz" className="btn btn-secondary">
            先去极速测评
          </Link>
        </div>
      </form>
    </div>
  );
}
