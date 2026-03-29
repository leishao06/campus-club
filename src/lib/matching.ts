import type { Club, DeepQuizAnswers, MatchResultItem, QuickQuizAnswers } from "@/types";
import { CLUBS } from "@/data/clubs";

const INTEREST_TO_KEYWORDS: Record<string, string[]> = {
  media: ["新媒体", "运营", "摄影"],
  dance: ["街舞", "排练"],
  volunteer: ["志愿", "支教", "公益"],
  tech: ["机器人", "编程", "竞赛"],
  debate: ["辩论", "演讲"],
  photo: ["摄影", "后期"],
  psych: ["心理", "朋辈"],
  startup: ["创业", "路演"],
};

const GOAL_WEIGHT: Record<QuickQuizAnswers["goal"], Partial<Record<Club["category"], number>>> = {
  skill: { academic: 1.2, innovation: 1.15, arts_sports: 1, hobby: 1.1, volunteer: 1 },
  social: { arts_sports: 1.2, hobby: 1.15, volunteer: 1.1, academic: 1, innovation: 1 },
  credits: { academic: 1.1, volunteer: 1.2, innovation: 1.05, arts_sports: 1, hobby: 1 },
  award: { innovation: 1.25, academic: 1.15, arts_sports: 1.1, volunteer: 1, hobby: 1 },
};

function needsInterview(c: Club): boolean {
  return c.recruitment.assessment === "interview" || c.recruitment.assessment === "both";
}

function needsWritten(c: Club): boolean {
  return c.recruitment.assessment === "written" || c.recruitment.assessment === "both";
}

/** 第一层：硬过滤 */
export function filterClubs(
  quick: QuickQuizAnswers,
  clubs: Club[] = CLUBS
): { passed: Club[]; filtered: { club: Club; reason: string }[] } {
  const filtered: { club: Club; reason: string }[] = [];
  const passed: Club[] = [];

  for (const c of clubs) {
    if (!quick.interviewOk && needsInterview(c)) {
      filtered.push({ club: c, reason: "该社团招新包含面试，与你不接受面试的选项不符" });
      continue;
    }
    if (!quick.feeOk && c.recruitment.fee > 0) {
      filtered.push({ club: c, reason: "该社团收取会费，与你选择的不接受会费不符" });
      continue;
    }
    if (quick.weeklyHours === "lte2" && c.weeklyHours > 5) {
      filtered.push({
        club: c,
        reason: `该社团平均周投入约 ${c.weeklyHours} 小时，高于你可接受的强度`,
      });
      continue;
    }
    if (quick.weeklyHours === "2to5" && c.weeklyHours > 8) {
      filtered.push({
        club: c,
        reason: `周投入约 ${c.weeklyHours} 小时，略超出你当前时间预算`,
      });
      continue;
    }
    passed.push(c);
  }

  return { passed, filtered };
}

function tagOverlapScore(interestIds: string[], club: Club): number {
  let score = 0;
  for (const id of interestIds) {
    const keys = INTEREST_TO_KEYWORDS[id] ?? [];
    for (const k of keys) {
      if (club.tags.some((t) => t.includes(k) || k.includes(t))) score += 12;
      if (club.name.includes(k) || club.highlights.some((h) => h.includes(k))) score += 6;
    }
  }
  return Math.min(55, score);
}

function buildReason(
  club: Club,
  quick: QuickQuizAnswers,
  deep: DeepQuizAnswers | null,
  baseScore: number
): string {
  const parts: string[] = [];
  const goalMap: Record<QuickQuizAnswers["goal"], string> = {
    skill: "学技能与实践",
    social: "社交与圈子",
    credits: "第二课堂与学分",
    award: "评奖与荣誉",
  };
  parts.push(`你的核心目标是「${goalMap[quick.goal]}」，与该社团方向契合`);

  const ih = interestIdsToLabels(quick.interest);
  if (ih.length) parts.push(`你关注的兴趣领域包含：${ih.join("、")}`);

  if (club.highlights[0]) parts.push(`社团亮点：${club.highlights[0]}`);

  parts.push(`每周活动强度约 ${club.weeklyHours} 小时，符合你的时间预期`);

  if (deep?.skills) parts.push(`结合你填写的特长「${deep.skills.slice(0, 20)}${deep.skills.length > 20 ? "…" : ""}」做了加权`);

  if (needsWritten(club) && !needsInterview(club)) parts.push("考核以笔试为主，与你可接受的考核形式一致");

  return `匹配度 ${Math.round(baseScore)}%｜${parts.join("；")}。`;
}

function interestIdsToLabels(ids: string[]): string[] {
  const map: Record<string, string> = {
    media: "新媒体",
    dance: "舞蹈",
    volunteer: "公益",
    tech: "科技",
    debate: "思辨",
    photo: "摄影",
    psych: "心理",
    startup: "创业",
  };
  return ids.map((id) => map[id] ?? id);
}

/** 第二 + 三层简化：标签相似度 + 目标加权 + 热度微调 */
export function computeMatches(
  quick: QuickQuizAnswers,
  deep: DeepQuizAnswers | null,
  topN = 10
): MatchResultItem[] {
  const { passed } = filterClubs(quick);

  const items: MatchResultItem[] = passed.map((club) => {
    let score = 40;
    score += tagOverlapScore(quick.interest, club);
    const gw = GOAL_WEIGHT[quick.goal][club.category] ?? 1;
    score *= gw;
    if (club.beginnerFriendly && quick.goal === "skill") score += 5;
    if (deep?.personality === "outgoing" && club.category === "arts_sports") score += 4;
    if (deep?.personality === "calm" && club.category === "academic") score += 4;
    score += Math.min(8, club.heat / 400);
    score = Math.min(98, Math.round(score));
    const reason = buildReason(club, quick, deep, score);
    return { club, score, reason };
  });

  items.sort((a, b) => b.score - a.score);
  return items.slice(0, topN);
}

export function explainFilters(quick: QuickQuizAnswers): string {
  const bits: string[] = [];
  if (!quick.interviewOk) bits.push("已排除需面试的社团");
  if (!quick.feeOk) bits.push("已排除收取会费的社团");
  if (quick.weeklyHours === "lte2") bits.push("已排除周投入过高的社团");
  return bits.join("；") || "未启用硬性排除，以下为综合排序结果";
}
