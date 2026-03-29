import { useApp } from "@/context/AppContext";

export default function Profile() {
  const { profile, setProfile } = useApp();

  function update<K extends keyof typeof profile>(key: K, value: (typeof profile)[K]) {
    setProfile({ ...profile, [key]: value });
  }

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">统一报名档案</h1>
        <p className="page-lead">同一份档案可向多个社团投递报名，最多五个；提交前请核对信息与联系方式。</p>
      </header>

      <form
        className="card stack"
        style={{ marginTop: "0.25rem" }}
        onSubmit={(e) => {
          e.preventDefault();
          alert("档案已保存");
        }}
      >
        <div className="field">
          <label className="form-question" htmlFor="p-name">
            姓名
          </label>
          <input id="p-name" value={profile.name} onChange={(e) => update("name", e.target.value)} required />
        </div>
        <div className="field">
          <label className="form-question" htmlFor="p-id">
            学号
          </label>
          <input id="p-id" value={profile.studentId} onChange={(e) => update("studentId", e.target.value)} required />
        </div>
        <div className="field">
          <label className="form-question" htmlFor="p-phone">
            手机号码
          </label>
          <input id="p-phone" value={profile.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div className="field">
          <label className="form-question" htmlFor="p-email">
            电子邮箱
          </label>
          <input id="p-email" type="email" value={profile.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div className="field">
          <label className="form-question" htmlFor="p-talents">
            兴趣特长
          </label>
          <input id="p-talents" value={profile.talents} onChange={(e) => update("talents", e.target.value)} />
        </div>
        <div className="field">
          <label className="form-question" htmlFor="p-bio">
            自我介绍
          </label>
          <textarea id="p-bio" value={profile.bio} onChange={(e) => update("bio", e.target.value)} placeholder="简要说明个人经历与加入社团的期望" />
        </div>
        <button type="submit" className="btn btn-primary">
          保存档案
        </button>
      </form>
    </div>
  );
}
