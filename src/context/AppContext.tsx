import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Application,
  ApplicationStatus,
  Complaint,
  DeepQuizAnswers,
  QuickQuizAnswers,
  StudentProfile,
  UserRole,
} from "@/types";
import { computeMatches, explainFilters, filterClubs } from "@/lib/matching";
import { CLUBS } from "@/data/clubs";

const STORAGE_KEY = "club-platform-v1";

interface Persisted {
  role: UserRole | null;
  quickQuiz: QuickQuizAnswers | null;
  deepQuiz: DeepQuizAnswers | null;
  profile: StudentProfile | null;
  applications: Application[];
  favorites: string[];
  compare: string[];
  messagesRead: boolean;
}

const defaultProfile: StudentProfile = {
  name: "张三",
  studentId: "2026000001",
  phone: "13800000000",
  email: "demo@univ.edu.cn",
  bio: "热爱校园生活，希望加入适合自己的社团。",
  talents: "写作、摄影入门",
};

const defaultQuick: QuickQuizAnswers = {
  weeklyHours: "2to5",
  goal: "skill",
  interest: ["media", "photo"],
  interviewOk: true,
  feeOk: true,
};

function loadPersisted(): Partial<Persisted> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<Persisted>;
  } catch {
    return {};
  }
}

function savePersisted(p: Partial<Persisted>) {
  try {
    const prev = loadPersisted();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, ...p }));
  } catch {
    /* ignore */
  }
}

const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: "t1",
    title: "招新简章与实际情况不符",
    from: "匿名新生",
    target: "某兴趣类社团",
    status: "processing",
    createdAt: "2026-09-28",
  },
  {
    id: "t2",
    title: "咨询回复不及时",
    from: "李**",
    target: "街舞协会",
    status: "open",
    createdAt: "2026-09-29",
  },
];

interface AppCtx {
  role: UserRole | null;
  setRole: (r: UserRole | null) => void;
  quickQuiz: QuickQuizAnswers | null;
  setQuickQuiz: (q: QuickQuizAnswers | null) => void;
  deepQuiz: DeepQuizAnswers | null;
  setDeepQuiz: (d: DeepQuizAnswers | null) => void;
  profile: StudentProfile;
  setProfile: (p: StudentProfile) => void;
  applications: Application[];
  applyToClub: (clubId: string) => { ok: boolean; message: string };
  favorites: string[];
  toggleFavorite: (clubId: string) => void;
  compare: string[];
  toggleCompare: (clubId: string) => { ok: boolean; message: string };
  matchResults: ReturnType<typeof computeMatches>;
  filterExplain: string;
  filteredOut: ReturnType<typeof filterClubs>["filtered"];
  advanceApplication: (appId: string, status: ApplicationStatus) => void;
  complaints: Complaint[];
  updateComplaint: (id: string, status: Complaint["status"]) => void;
  resetDemo: () => void;
}

const Ctx = createContext<AppCtx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole | null>(null);
  const [quickQuiz, setQuickQuizState] = useState<QuickQuizAnswers | null>(null);
  const [deepQuiz, setDeepQuizState] = useState<DeepQuizAnswers | null>(null);
  const [profile, setProfileState] = useState<StudentProfile>(defaultProfile);
  const [applications, setApplications] = useState<Application[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>(MOCK_COMPLAINTS);

  useEffect(() => {
    const p = loadPersisted();
    if (p.role) setRoleState(p.role);
    if (p.quickQuiz) setQuickQuizState(p.quickQuiz);
    if (p.deepQuiz) setDeepQuizState(p.deepQuiz);
    if (p.profile) setProfileState(p.profile);
    if (p.applications) setApplications(p.applications);
    if (p.favorites) setFavorites(p.favorites);
    if (p.compare) setCompare(p.compare);
  }, []);

  const setRole = useCallback((r: UserRole | null) => {
    setRoleState(r);
    savePersisted({ role: r });
  }, []);

  const setQuickQuiz = useCallback((q: QuickQuizAnswers | null) => {
    setQuickQuizState(q);
    savePersisted({ quickQuiz: q });
  }, []);

  const setDeepQuiz = useCallback((d: DeepQuizAnswers | null) => {
    setDeepQuizState(d);
    savePersisted({ deepQuiz: d });
  }, []);

  const setProfile = useCallback((p: StudentProfile) => {
    setProfileState(p);
    savePersisted({ profile: p });
  }, []);

  const matchResults = useMemo(() => {
    const q = quickQuiz ?? defaultQuick;
    return computeMatches(q, deepQuiz, 10);
  }, [quickQuiz, deepQuiz]);

  const filterExplain = useMemo(
    () => explainFilters(quickQuiz ?? defaultQuick),
    [quickQuiz]
  );

  const filteredOut = useMemo(() => {
    const q = quickQuiz ?? defaultQuick;
    return filterClubs(q).filtered;
  }, [quickQuiz]);

  const applyToClub = useCallback(
    (clubId: string) => {
      const max = 5;
      const club = CLUBS.find((c) => c.id === clubId);
      if (!club) return { ok: false, message: "社团不存在" };
      if (applications.some((a) => a.clubId === clubId)) {
        return { ok: false, message: "已投递该社团" };
      }
      if (applications.length >= max) {
        return { ok: false, message: `最多投递 ${max} 个社团` };
      }
      if (!profile.name.trim() || !profile.studentId.trim()) {
        return { ok: false, message: "请先在「我的档案」完善姓名与学号" };
      }
      const q = quickQuiz ?? defaultQuick;
      const m = computeMatches(q, deepQuiz, 20).find((x) => x.club.id === clubId);
      const app: Application = {
        id: `app-${Date.now()}`,
        clubId,
        clubName: club.name,
        status: "submitted",
        submittedAt: new Date().toISOString().slice(0, 10),
        matchScore: m?.score ?? 80,
      };
      const next = [...applications, app];
      setApplications(next);
      savePersisted({ applications: next });
      return { ok: true, message: "投递成功" };
    },
    [applications, profile, quickQuiz, deepQuiz]
  );

  const toggleFavorite = useCallback((clubId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(clubId) ? prev.filter((id) => id !== clubId) : [...prev, clubId];
      savePersisted({ favorites: next });
      return next;
    });
  }, []);

  const toggleCompare = useCallback((clubId: string) => {
    if (compare.includes(clubId)) {
      const next = compare.filter((id) => id !== clubId);
      setCompare(next);
      savePersisted({ compare: next });
      return { ok: true, message: "已移出对比" };
    }
    if (compare.length >= 3) {
      return { ok: false, message: "最多对比 3 个社团" };
    }
    const next = [...compare, clubId];
    setCompare(next);
    savePersisted({ compare: next });
    return { ok: true, message: "已加入对比清单" };
  }, [compare]);

  const advanceApplication = useCallback((appId: string, status: ApplicationStatus) => {
    setApplications((prev) => {
      const next = prev.map((a) => (a.id === appId ? { ...a, status } : a));
      savePersisted({ applications: next });
      return next;
    });
  }, []);

  const updateComplaint = useCallback((id: string, status: Complaint["status"]) => {
    setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  }, []);

  const resetDemo = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRoleState(null);
    setQuickQuizState(null);
    setDeepQuizState(null);
    setProfileState(defaultProfile);
    setApplications([]);
    setFavorites([]);
    setCompare([]);
    setComplaints(MOCK_COMPLAINTS);
  }, []);

  const value: AppCtx = {
    role,
    setRole,
    quickQuiz,
    setQuickQuiz,
    deepQuiz,
    setDeepQuiz,
    profile,
    setProfile,
    applications,
    applyToClub,
    favorites,
    toggleFavorite,
    compare,
    toggleCompare,
    matchResults,
    filterExplain,
    filteredOut,
    advanceApplication,
    complaints,
    updateComplaint,
    resetDemo,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp outside provider");
  return c;
}
