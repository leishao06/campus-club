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
      <header className="page-header">
        <h1 className="page-title">深度测评</h1>
        <p className="page-lead">预计用时约 2 分钟。提交后将结合极速测评结果，重新排序并生成更细的匹配说明。</p>
      </header>

      <form onSubmit={submit} className="card stack" style={{ marginTop: "0.25rem" }}>
        <div className="field">
          <label className="form-question" htmlFor="d-skills">
            特长与技能
          </label>
          <p className="form-hint">选填，用于加权匹配</p>
          <textarea
            id="d-skills"
            value={form.skills}
            onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
            placeholder="例如：视频剪辑、Python、播音主持"
          />
        </div>
        <div className="field">
          <label className="form-question" htmlFor="d-exp">
            相关经历
          </label>
          <textarea
            id="d-exp"
            value={form.experience}
            onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
            placeholder="例如：校级媒体实习、志愿服务经历"
          />
        </div>
        <div className="field">
          <label className="form-question" htmlFor="d-career">
            学业或职业规划（简答）
          </label>
          <textarea
            id="d-career"
            value={form.career}
            onChange={(e) => setForm((f) => ({ ...f, career: e.target.value }))}
            placeholder="例如：希望从事新媒体、科研或公共服务相关方向"
          />
        </div>
        <div className="field">
          <label className="form-question" htmlFor="d-personality">
            性格倾向
          </label>
          <select
            id="d-personality"
            value={form.personality}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                personality: e.target.value as DeepQuizAnswers["personality"],
              }))
            }
          >
            <option value="outgoing">偏外向、协作</option>
            <option value="balanced">均衡</option>
            <option value="calm">偏内敛、专注</option>
          </select>
        </div>
        <div className="field">
          <label className="form-question" htmlFor="d-range">
            本学期可投入社团的时间（约 {form.budgetHours} 小时/周）
          </label>
          <input
            id="d-range"
            type="range"
            min={1}
            max={12}
            value={form.budgetHours}
            onChange={(e) => setForm((f) => ({ ...f, budgetHours: Number(e.target.value) }))}
          />
        </div>
        <div className="primary-actions">
          <button type="submit" className="btn btn-primary">
            提交并更新匹配结果
          </button>
          <Link to="/student/quiz" className="btn btn-secondary">
            返回极速测评
          </Link>
        </div>
      </form>
    </div>
  );
}
