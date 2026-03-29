import { useApp } from "@/context/AppContext";

export default function Profile() {
  const { profile, setProfile } = useApp();

  function update<K extends keyof typeof profile>(key: K, value: (typeof profile)[K]) {
    setProfile({ ...profile, [key]: value });
  }

  return (
    <div>
      <h1>通用档案</h1>
      <p className="muted">一份档案可投递多个社团，最多 5 个；信息仅用于招新演示。</p>

      <form
        className="card stack"
        style={{ marginTop: "1rem" }}
        onSubmit={(e) => {
          e.preventDefault();
          alert("已保存");
        }}
      >
        <div className="field">
          <label>姓名</label>
          <input value={profile.name} onChange={(e) => update("name", e.target.value)} required />
        </div>
        <div className="field">
          <label>学号</label>
          <input value={profile.studentId} onChange={(e) => update("studentId", e.target.value)} required />
        </div>
        <div className="field">
          <label>手机</label>
          <input value={profile.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div className="field">
          <label>邮箱</label>
          <input type="email" value={profile.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div className="field">
          <label>兴趣特长</label>
          <input value={profile.talents} onChange={(e) => update("talents", e.target.value)} />
        </div>
        <div className="field">
          <label>自我介绍</label>
          <textarea value={profile.bio} onChange={(e) => update("bio", e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">
          保存档案
        </button>
      </form>
    </div>
  );
}
