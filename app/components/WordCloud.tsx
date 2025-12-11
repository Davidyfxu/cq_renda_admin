"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { wordCloudData, wordCloudCategoryColors } from "@/lib/chartData";

export default function WordCloud() {
  // Calculate positions for words in a cloud-like arrangement
  const positionedWords = useMemo(() => {
    const sorted = [...wordCloudData].sort((a, b) => b.value - a.value);
    const maxValue = Math.max(...sorted.map((w) => w.value));
    const minValue = Math.min(...sorted.map((w) => w.value));

    return sorted.map((word, index) => {
      // Normalize value to font size (14px to 42px)
      const normalized = (word.value - minValue) / (maxValue - minValue);
      const fontSize = 14 + normalized * 28;

      // Create spiral-like positions
      const angle = index * 0.8;
      const radius = 20 + index * 8;
      const x = 50 + Math.cos(angle) * (radius / 4);
      const y = 50 + Math.sin(angle) * (radius / 6);

      return {
        ...word,
        fontSize,
        x: Math.max(10, Math.min(90, x)),
        y: Math.max(15, Math.min(85, y)),
        delay: index * 0.03,
        color: wordCloudCategoryColors[word.category],
      };
    });
  }, []);

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
          <span className="inline-block px-5 py-2 bg-purple-50 text-purple-600 text-sm font-medium rounded-full mb-5">
            热点分析
          </span>
          <h2
            style={{ margin: "16px" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 md:mb-5"
          >
            民情民意<span className="text-purple-500">热词云</span>
          </h2>
          <p className="text-slate-500 flex items-center justify-center text-base sm:text-lg">
            基于AI智能分析的民意关键词提取，直观展示群众关注焦点
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-5 sm:p-6 md:p-8"
        >
          <div
            style={{ padding: 16 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 md:mb-8"
          >
            <div className="flex items-center gap-4">
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
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                  热点关键词分布
                </h3>
              </div>
            </div>
          </div>

          {/* Word Cloud Container */}
          <div className="relative h-[350px] sm:h-[400px] md:h-[450px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-red-100 blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-cyan-100 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-purple-100 blur-3xl" />
            </div>

            {/* Words */}
            <div className="relative w-full h-full">
              {positionedWords.map((word, index) => (
                <motion.div
                  key={word.text}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: word.delay,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                  className="absolute cursor-pointer transition-all duration-300"
                  style={{
                    left: `${word.x}%`,
                    top: `${word.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span
                    className="font-semibold whitespace-nowrap hover:drop-shadow-lg transition-all duration-300"
                    style={{
                      fontSize: `${word.fontSize}px`,
                      color: word.color,
                      opacity: 0.7 + (word.value / 100) * 0.3,
                    }}
                    title={`${word.text}: ${word.value}次提及`}
                  >
                    {word.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {Object.entries(wordCloudCategoryColors).map(
              ([category, color]) => (
                <div key={category} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-slate-600">{category}</span>
                </div>
              )
            )}
          </div>

          {/* Stats below word cloud */}
          <div className="mt-6 md:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "热词总数",
                value: wordCloudData.length,
                color: "purple",
              },
              { label: "最高关注", value: "老旧小区改造", color: "red" },
              { label: "涉及领域", value: "5大类", color: "cyan" },
              { label: "AI识别率", value: "96.8%", color: "amber" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-slate-50/80"
              >
                <div
                  className={`text-lg sm:text-xl font-bold ${
                    stat.color === "purple"
                      ? "text-purple-600"
                      : stat.color === "red"
                      ? "text-red-600"
                      : stat.color === "cyan"
                      ? "text-cyan-600"
                      : "text-amber-600"
                  }`}
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
