// Structured data for the platform based on provided statistics

export interface YearlyData {
  year: string;
  total: number;
  online: number;
  offline: number;
}

export interface CategoryData {
  year: string;
  财政农业旅贸: number;
  城建城管环保: number;
  工业交通: number;
  科教文卫体: number;
  政治法律党群: number;
}

export interface PieDataItem {
  name: string;
  value: number;
  fill: string;
  [key: string]: string | number;
}

// Yearly totals with online/offline breakdown
export const yearlyTotals: YearlyData[] = [
  { year: "2022", total: 290, online: 79, offline: 211 },
  { year: "2023", total: 116, online: 116, offline: 0 },
  { year: "2024", total: 261, online: 261, offline: 0 },
  { year: "2025", total: 132, online: 132, offline: 0 },
];

// Category breakdown by year
export const categoryByYear: CategoryData[] = [
  {
    year: "2022",
    财政农业旅贸: 0,
    城建城管环保: 257,
    工业交通: 2,
    科教文卫体: 31,
    政治法律党群: 0,
  },
  {
    year: "2023",
    财政农业旅贸: 2,
    城建城管环保: 72,
    工业交通: 11,
    科教文卫体: 28,
    政治法律党群: 3,
  },
  {
    year: "2024",
    财政农业旅贸: 1,
    城建城管环保: 193,
    工业交通: 15,
    科教文卫体: 45,
    政治法律党群: 7,
  },
  {
    year: "2025",
    财政农业旅贸: 1,
    城建城管环保: 73,
    工业交通: 0,
    科教文卫体: 54,
    政治法律党群: 4,
  },
];

// Aggregated category data for pie chart (all years combined)
export const aggregatedCategories: PieDataItem[] = [
  { name: "城建城管环保", value: 257 + 72 + 193 + 73, fill: "#dc2626" },
  { name: "科教文卫体", value: 31 + 28 + 45 + 54, fill: "#0891b2" },
  { name: "工业交通", value: 2 + 11 + 15 + 0, fill: "#d97706" },
  { name: "政治法律党群", value: 0 + 3 + 7 + 4, fill: "#7c3aed" },
  { name: "财政农业旅贸", value: 0 + 2 + 1 + 1, fill: "#059669" },
];

// Color mapping for categories
export const categoryColors: Record<string, string> = {
  财政农业旅贸: "#059669",
  城建城管环保: "#dc2626",
  工业交通: "#d97706",
  科教文卫体: "#0891b2",
  政治法律党群: "#7c3aed",
};

// Online vs Offline data for visualization
export const channelData = yearlyTotals.map((d) => ({
  year: d.year,
  线上: d.online,
  线下: d.offline,
}));

// Summary statistics
export const summaryStats = {
  totalFeedback: yearlyTotals.reduce((sum, d) => sum + d.total, 0),
  totalOnline: yearlyTotals.reduce((sum, d) => sum + d.online, 0),
  totalOffline: yearlyTotals.reduce((sum, d) => sum + d.offline, 0),
  yearsTracked: yearlyTotals.length,
  topCategory: "城建城管环保",
  topCategoryCount: 257 + 72 + 193 + 73,
};

// Word cloud data - Hot topics keywords with weights
export interface WordCloudItem {
  text: string;
  value: number;
  category: string;
}

export const wordCloudData: WordCloudItem[] = [
  // 城建城管环保类 - 权重最高
  { text: "老旧小区改造", value: 98, category: "城建城管环保" },
  { text: "道路维修", value: 85, category: "城建城管环保" },
  { text: "垃圾分类", value: 78, category: "城建城管环保" },
  { text: "绿化养护", value: 72, category: "城建城管环保" },
  { text: "违章建筑", value: 68, category: "城建城管环保" },
  { text: "噪音扰民", value: 65, category: "城建城管环保" },
  { text: "市容市貌", value: 62, category: "城建城管环保" },
  { text: "污水治理", value: 58, category: "城建城管环保" },
  { text: "公共设施", value: 55, category: "城建城管环保" },
  { text: "路灯照明", value: 52, category: "城建城管环保" },
  { text: "管道改造", value: 48, category: "城建城管环保" },
  { text: "环境整治", value: 45, category: "城建城管环保" },
  
  // 科教文卫体类
  { text: "社区医疗", value: 70, category: "科教文卫体" },
  { text: "教育资源", value: 65, category: "科教文卫体" },
  { text: "文化活动", value: 55, category: "科教文卫体" },
  { text: "健身设施", value: 50, category: "科教文卫体" },
  { text: "养老服务", value: 48, category: "科教文卫体" },
  { text: "托育服务", value: 42, category: "科教文卫体" },
  { text: "公共卫生", value: 40, category: "科教文卫体" },
  { text: "体育场地", value: 38, category: "科教文卫体" },
  
  // 工业交通类
  { text: "停车难", value: 60, category: "工业交通" },
  { text: "交通拥堵", value: 55, category: "工业交通" },
  { text: "公交线路", value: 45, category: "工业交通" },
  { text: "非机动车", value: 40, category: "工业交通" },
  { text: "交通标识", value: 35, category: "工业交通" },
  
  // 政治法律党群类
  { text: "物业管理", value: 50, category: "政治法律党群" },
  { text: "业委会", value: 42, category: "政治法律党群" },
  { text: "社区治理", value: 38, category: "政治法律党群" },
  { text: "邻里纠纷", value: 32, category: "政治法律党群" },
  
  // 财政农业旅贸类
  { text: "便民服务", value: 35, category: "财政农业旅贸" },
  { text: "营商环境", value: 30, category: "财政农业旅贸" },
  { text: "民生补贴", value: 28, category: "财政农业旅贸" },
];

// Category color for word cloud
export const wordCloudCategoryColors: Record<string, string> = {
  城建城管环保: "#dc2626",
  科教文卫体: "#0891b2",
  工业交通: "#d97706",
  政治法律党群: "#7c3aed",
  财政农业旅贸: "#059669",
};
