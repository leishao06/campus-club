export type UserRole = "student" | "club" | "school";

export type ClubCategory =
  | "academic"
  | "arts_sports"
  | "volunteer"
  | "innovation"
  | "hobby";

export interface Club {
  id: string;
  name: string;
  shortName: string;
  category: ClubCategory;
  categoryLabel: string;
  tags: string[];
  heat: number;
  deadline: string;
  /** 六大模块 + 业务字段 */
  official: {
    founded: string;
    supervisor: string;
    members: number;
    honors: string[];
    annualReview: "passed" | "pending";
  };
  recruitment: {
    quota: number;
    departments: string[];
    requirements: string;
    assessment: "none" | "written" | "interview" | "both";
    fee: number;
    feeApproved: boolean;
    credits: boolean;
  };
  dynamics: { title: string; type: "photo" | "video"; date: string }[];
  reviews: {
    author: string;
    anonymous: boolean;
    text: string;
    tags: string[];
    rating: number;
  }[];
  faq: { q: string; a: string }[];
  compliance: { tips: string[]; violations: string[] };
  weeklyHours: number;
  beginnerFriendly: boolean;
  highlights: string[];
}

export interface QuickQuizAnswers {
  weeklyHours: "lte2" | "2to5" | "5plus";
  goal: "skill" | "social" | "credits" | "award";
  interest: string[];
  interviewOk: boolean;
  /** 是否接受会费 */
  feeOk: boolean;
}

export interface DeepQuizAnswers {
  skills: string;
  experience: string;
  career: string;
  personality: "outgoing" | "calm" | "balanced";
  budgetHours: number;
}

export interface StudentProfile {
  name: string;
  studentId: string;
  phone: string;
  email: string;
  bio: string;
  talents: string;
}

export type ApplicationStatus =
  | "submitted"
  | "accepted"
  | "interview"
  | "written"
  | "pending"
  | "rejected";

export interface Application {
  id: string;
  clubId: string;
  clubName: string;
  status: ApplicationStatus;
  submittedAt: string;
  matchScore: number;
}

export interface MatchResultItem {
  club: Club;
  score: number;
  reason: string;
}

export interface Complaint {
  id: string;
  title: string;
  from: string;
  target: string;
  status: "open" | "processing" | "closed";
  createdAt: string;
}
