"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { wordCloudData, wordCloudCategoryColors } from "@/lib/chartData";

// 2025年关键词词云数据（按权重排列）
const keywords2025Cloud = [
  { text: "老旧小区改造", value: 98, color: "#dc2626" },
  { text: "社区医疗", value: 85, color: "#0891b2" },
  { text: "道路维修", value: 78, color: "#dc2626" },
  { text: "养老服务", value: 72, color: "#0891b2" },
  { text: "垃圾分类", value: 68, color: "#dc2626" },
  { text: "教育资源", value: 65, color: "#0891b2" },
  { text: "物业管理", value: 55, color: "#7c3aed" },
  { text: "社区治理", value: 48, color: "#7c3aed" },
  { text: "便民服务", value: 35, color: "#059669" },
];

// AI履职建议数据
const aiRecommendations = [
  {
    icon: "🏗️",
    title: "老旧小区改造专项监督",
    desc: "开展改造项目进度视察，监督资金使用与施工质量",
  },
  {
    icon: "🏥",
    title: "医疗养老服务体系调研",
    desc: '推动"15分钟健康服务圈"建设，完善社区养老配套',
  },
  {
    icon: "📋",
    title: "物业管理条例执法检查",
    desc: "规范业委会运作，化解物业纠纷，提升服务质量",
  },
  {
    icon: "📊",
    title: "民生实事项目跟踪问效",
    desc: "建立代表跟踪监督机制，确保群众诉求闭环落实",
  },
];

// 打字机效果组件
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [text, started]);

  return (
    <span>
      {displayText}
      {started && displayText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}

// 词云位置计算函数
function calculateCloudPositions(
  data: { text: string; value: number; color: string }[],
  minFont: number,
  maxFont: number
) {
  const sorted = [...data].sort((a, b) => b.value - a.value);
  const maxValue = Math.max(...sorted.map((w) => w.value));
  const minValue = Math.min(...sorted.map((w) => w.value));

  return sorted.map((word, index) => {
    const normalized = (word.value - minValue) / (maxValue - minValue || 1);
    const fontSize = minFont + normalized * (maxFont - minFont);
    const angle = index * 1.2;
    const radius = 15 + index * 12;
    const x = 50 + Math.cos(angle) * (radius / 3.5);
    const y = 50 + Math.sin(angle) * (radius / 4);

    return {
      ...word,
      fontSize,
      x: Math.max(12, Math.min(88, x)),
      y: Math.max(18, Math.min(82, y)),
      delay: index * 0.05,
    };
  });
}

export default function WordCloud() {
  // Calculate positions for main word cloud
  const positionedWords = useMemo(() => {
    const sorted = [...wordCloudData].sort((a, b) => b.value - a.value);
    const maxValue = Math.max(...sorted.map((w) => w.value));
    const minValue = Math.min(...sorted.map((w) => w.value));

    return sorted.map((word, index) => {
      const normalized = (word.value - minValue) / (maxValue - minValue);
      const fontSize = 14 + normalized * 28;
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

  // 2025年关键词词云位置
  const positioned2025Keywords = useMemo(
    () => calculateCloudPositions(keywords2025Cloud, 14, 32),
    []
  );

  // AI建议是否在视口内
  const [aiInView, setAiInView] = useState(false);

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
            2025年民情民意<span className="text-purple-500">热词云</span>
          </h2>
          <p className="text-slate-500 flex items-center justify-center text-base sm:text-lg">
            基于AI智能分析的民意关键词提取，直观展示群众关注焦点
          </p>
        </motion.div>

        {/* 2025年关键词领域 + AI工作建议（词云版） */}
        <motion.div
          style={{ padding: 16 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card p-6 sm:p-8 md:p-10 mt-10"
        >
          {/* 标题区 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-white"
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
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-800">
              热点关键词分布
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* 左侧：2025年关键词词云 */}
            <div className="flex flex-col h-full">
              <div className="relative flex-1 min-h-[280px] sm:min-h-[320px] lg:min-h-[340px] overflow-hidden rounded-2xl bg-gradient-to-br from-red-50/50 via-cyan-50/30 to-purple-50/50 border border-slate-100 shadow-sm">
                {positioned2025Keywords.map((word) => (
                  <motion.div
                    key={word.text}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: word.delay,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${word.x}%`,
                      top: `${word.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <span
                      className="font-semibold whitespace-nowrap hover:drop-shadow-md transition-all"
                      style={{
                        fontSize: `${word.fontSize * 1.15}px`,
                        color: word.color,
                      }}
                    >
                      {word.text}
                    </span>
                  </motion.div>
                ))}
              </div>
              {/* 图例 */}
              <div className="flex flex-wrap justify-center gap-4 mt-4 pt-2">
                {[
                  { name: "城建城管环保", color: "#dc2626" },
                  { name: "科教文卫体", color: "#0891b2" },
                  { name: "政治法律党群", color: "#7c3aed" },
                  { name: "财政农业旅贸", color: "#059669" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-slate-500">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 右侧：AI履职建议（条目式+打字机效果） */}
            <motion.div
              onViewportEnter={() => setAiInView(true)}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                {aiRecommendations.map((rec, index) => (
                  <motion.div
                    key={rec.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={aiInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.3 }}
                    className="flex items-start gap-4 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-xl sm:text-2xl flex-shrink-0">
                      {rec.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm sm:text-base text-slate-800">
                        {aiInView ? (
                          <TypewriterText
                            text={rec.title}
                            delay={index * 800}
                          />
                        ) : (
                          rec.title
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                        {aiInView ? (
                          <TypewriterText
                            text={rec.desc}
                            delay={index * 800 + 400}
                          />
                        ) : (
                          rec.desc
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
