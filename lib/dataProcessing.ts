import type { FeedbackRecord } from "./db";

// Keywords mapping for Chinese government/civic topics
const KEYWORD_CATEGORIES: Record<string, string[]> = {
  基础设施: ["道路", "路灯", "维修", "设施", "建设", "改造", "修缮", "工程"],
  社区服务: ["社区", "服务", "物业", "管理", "居民", "便民", "办事"],
  环境卫生: ["环境", "卫生", "垃圾", "清洁", "绿化", "污染", "噪音"],
  交通出行: ["交通", "停车", "车辆", "公交", "出行", "堵车", "安全"],
  民生保障: ["医疗", "教育", "养老", "就业", "保障", "补贴", "救助"],
  文化活动: ["文化", "活动", "娱乐", "体育", "健身", "公园", "广场"],
  城市治理: ["治理", "秩序", "执法", "监管", "投诉", "建议", "意见"],
  其他事项: [],
};

export interface KeywordCount {
  name: string;
  count: number;
  fill: string;
}

export interface TrendData {
  date: string;
  count: number;
}

// Color palette for charts - matching our theme
const CHART_COLORS = [
  "#f59e0b", // Gold
  "#06b6d4", // Cyan
  "#ef4444", // Red
  "#10b981", // Emerald
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#3b82f6", // Blue
  "#14b8a6", // Teal
];

export function extractKeywords(feedbackList: FeedbackRecord[]): KeywordCount[] {
  const counts: Record<string, number> = {};

  // Initialize all categories
  for (const category of Object.keys(KEYWORD_CATEGORIES)) {
    counts[category] = 0;
  }

  for (const feedback of feedbackList) {
    const content = feedback.content || "";
    let matched = false;

    for (const [category, keywords] of Object.entries(KEYWORD_CATEGORIES)) {
      if (category === "其他事项") continue;

      for (const keyword of keywords) {
        if (content.includes(keyword)) {
          counts[category]++;
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      counts["其他事项"]++;
    }
  }

  // Convert to array and sort by count
  return Object.entries(counts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count], index) => ({
      name,
      count,
      fill: CHART_COLORS[index % CHART_COLORS.length],
    }));
}

export function groupByMonth(feedbackList: FeedbackRecord[]): TrendData[] {
  const monthCounts: Record<string, number> = {};

  for (const feedback of feedbackList) {
    const date = new Date(feedback.create_time);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
  }

  // Sort by date and return
  return Object.entries(monthCounts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }));
}

export function groupByDay(feedbackList: FeedbackRecord[]): TrendData[] {
  const dayCounts: Record<string, number> = {};

  for (const feedback of feedbackList) {
    const date = new Date(feedback.create_time);
    const dayKey = `${date.getMonth() + 1}/${date.getDate()}`;
    dayCounts[dayKey] = (dayCounts[dayKey] || 0) + 1;
  }

  return Object.entries(dayCounts)
    .slice(-30) // Last 30 days
    .map(([date, count]) => ({ date, count }));
}

// AI Tags for mock analysis
const AI_TAGS = [
  { label: "紧急", color: "#ef4444" },
  { label: "建议", color: "#06b6d4" },
  { label: "投诉", color: "#f59e0b" },
  { label: "咨询", color: "#10b981" },
  { label: "表扬", color: "#8b5cf6" },
];

export function generateAITag(content: string, index: number) {
  // Pseudo-random but deterministic based on content + index
  const seed = content.length + index;
  return AI_TAGS[seed % AI_TAGS.length];
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

