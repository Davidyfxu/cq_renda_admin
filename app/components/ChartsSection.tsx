"use client";

import { motion } from "framer-motion";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  yearlyTotals,
  categoryByYear,
  aggregatedCategories,
  channelData,
  categoryColors,
  summaryStats,
} from "@/lib/chartData";

export default function ChartsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="section-padding">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-5 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-5">
            数据可视化
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 md:mb-5">
            <span className="text-cyan-600">AI</span> 民意趋势分析
          </h2>
          <p
            style={{ marginTop: "16px" }}
            className="flex items-center justify-center text-base sm:text-lg"
          >
            拱墅人大平台民意数据统计分析，实时追踪社情民意，精准把握群众诉求
          </p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-10 md:mb-14"
        >
          {[
            {
              label: "总反馈数",
              value: summaryStats.totalFeedback,
              suffix: "条",
              color: "red",
            },
            {
              label: "线上收集",
              value: summaryStats.totalOnline,
              suffix: "条",
              color: "cyan",
            },
            {
              label: "线下收集",
              value: summaryStats.totalOffline,
              suffix: "条",
              color: "amber",
            },
            {
              label: "热点领域",
              value: summaryStats.topCategory,
              suffix: "",
              color: "purple",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              style={{ margin: "16px 0", padding: 16 }}
              variants={cardVariants}
              className="glass-card p-5 sm:p-6 md:p-7 text-center hover-lift"
            >
              <div
                className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 ${
                  stat.color === "red"
                    ? "text-red-600"
                    : stat.color === "cyan"
                    ? "text-cyan-600"
                    : stat.color === "amber"
                    ? "text-amber-600"
                    : "text-purple-600"
                }`}
              >
                {typeof stat.value === "number"
                  ? stat.value.toLocaleString()
                  : stat.value}
                <span className="text-lg sm:text-xl font-normal ml-1">
                  {stat.suffix}
                </span>
              </div>
              <div className="text-sm sm:text-base text-slate-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
        >
          {/* Yearly Trend Chart */}
          <motion.div
            variants={cardVariants}
            style={{ padding: 16 }}
            className="glass-card sm:p-6 md:p-8"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                  年度民意趋势
                </h3>
              </div>
            </div>

            <div className="h-[280px] sm:h-[320px] md:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={yearlyTotals}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="totalGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "#64748b", fontSize: 13 }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={{ stroke: "#e2e8f0" }}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 13 }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={{ stroke: "#e2e8f0" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      padding: "12px 16px",
                    }}
                    labelStyle={{
                      color: "#1e293b",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#dc2626"
                    strokeWidth={3}
                    fill="url(#totalGradient)"
                    name="总反馈数"
                    dot={{ fill: "#dc2626", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: "#dc2626" }}
                    label={{
                      position: "top",
                      fill: "#dc2626",
                      fontSize: 12,
                      fontWeight: 600,
                      offset: 10,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Channel Distribution Chart */}
          <motion.div
            variants={cardVariants}
            style={{ padding: 16 }}
            className="glass-card p-4 sm:p-6 md:p-8"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                  收集渠道分析
                </h3>
              </div>
            </div>

            <div className="h-[280px] sm:h-[320px] md:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={channelData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "#64748b", fontSize: 13 }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={{ stroke: "#e2e8f0" }}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 13 }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={{ stroke: "#e2e8f0" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      padding: "12px 16px",
                    }}
                    labelStyle={{
                      color: "#1e293b",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "13px", paddingTop: "16px" }}
                  />
                  <Bar
                    dataKey="线上"
                    fill="#0891b2"
                    radius={[6, 6, 0, 0]}
                    name="线上"
                    label={{
                      position: "top",
                      fill: "#0891b2",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  />
                  <Bar
                    dataKey="线下"
                    fill="#d97706"
                    radius={[6, 6, 0, 0]}
                    name="线下"
                    label={{
                      position: "top",
                      fill: "#d97706",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Distribution Pie Chart */}
          <motion.div
            variants={cardVariants}
            style={{ padding: 16 }}
            className="glass-card sm:p-6 md:p-8"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                  焦点领域分布
                </h3>
              </div>
            </div>

            <div className="h-[280px] sm:h-[320px] md:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={aggregatedCategories}
                    cx="50%"
                    cy="45%"
                    innerRadius="35%"
                    outerRadius="65%"
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    labelLine={{ stroke: "#94a3b8", strokeWidth: 1 }}
                  >
                    {aggregatedCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      padding: "12px 16px",
                    }}
                    formatter={(value: number) => [`${value} 条`, "反馈数量"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category by Year Stacked Bar Chart */}
          <motion.div
            variants={cardVariants}
            style={{ padding: 16 }}
            className="glass-card p-5 sm:p-6 md:p-8"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                  年度类别对比
                </h3>
              </div>
            </div>

            <div className="h-[280px] sm:h-[320px] md:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryByYear}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "#64748b", fontSize: 13 }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={{ stroke: "#e2e8f0" }}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 13 }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={{ stroke: "#e2e8f0" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      padding: "12px 16px",
                    }}
                    labelStyle={{
                      color: "#1e293b",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
                  />
                  <Bar
                    dataKey="城建城管环保"
                    stackId="a"
                    fill={categoryColors.城建城管环保}
                    label={{
                      position: "inside",
                      fill: "#fff",
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                  />
                  <Bar
                    dataKey="科教文卫体"
                    stackId="a"
                    fill={categoryColors.科教文卫体}
                    label={{
                      position: "inside",
                      fill: "#fff",
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                  />
                  <Bar
                    dataKey="工业交通"
                    stackId="a"
                    fill={categoryColors.工业交通}
                    label={{
                      position: "inside",
                      fill: "#fff",
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                  />
                  <Bar
                    dataKey="政治法律党群"
                    stackId="a"
                    fill={categoryColors.政治法律党群}
                    label={{
                      position: "inside",
                      fill: "#fff",
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                  />
                  <Bar
                    dataKey="财政农业旅贸"
                    stackId="a"
                    fill={categoryColors.财政农业旅贸}
                    radius={[6, 6, 0, 0]}
                    label={{
                      position: "inside",
                      fill: "#fff",
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
