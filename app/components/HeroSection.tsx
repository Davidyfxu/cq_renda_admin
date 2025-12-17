"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[65vh] md:min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden hero-pattern">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-red-50/80 to-transparent" />

        {/* Floating shapes */}
        <motion.div
          className="absolute top-16 left-[8%] w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 rotate-12"
          animate={{ y: [0, -20, 0], rotate: [12, 18, 12] }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-28 right-[12%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-cyan-500/10 to-cyan-600/5"
          animate={{ y: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-28 left-[15%] w-14 h-14 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 -rotate-12"
          animate={{ y: [0, -15, 0], rotate: [-12, -6, -12] }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute bottom-36 right-[8%] w-18 h-18 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-red-500/8 to-transparent rotate-45"
          animate={{ y: [0, 20, 0], rotate: [45, 50, 45] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full bg-red-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 container-responsive">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-red-200 bg-white/80 backdrop-blur-sm shadow-lg shadow-red-500/5 mb-10 md:mb-12"
        >
          <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-red-500" />
          </span>
          <span className="text-red-600 text-sm sm:text-base font-semibold tracking-wide">
            智慧人大 · 数字治理
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ margin: "16px" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 md:mb-10"
        >
          <span className="bg-gradient-to-r from-red-600 via-red-500 to-amber-500 bg-clip-text text-transparent">
            人大长庆街道工委
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          style={{ margin: "16px" }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-slate-700 mb-10 md:mb-14"
        >
          智慧履职数据驾驶舱
        </motion.h2>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          style={{ margin: "16px" }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-base sm:text-lg md:text-xl mb-14 md:mb-20"
        >
          <span className="flex items-center gap-2.5 text-cyan-600 font-medium">
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            AI驱动
          </span>
          <span className="text-slate-300 text-2xl">·</span>
          <span className="flex items-center gap-2.5 text-amber-600 font-medium">
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            民意直达
          </span>
          <span className="text-slate-300 text-2xl">·</span>
          <span className="flex items-center gap-2.5 text-red-600 font-medium">
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            高效治理
          </span>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="w-full flex justify-center items-center gap-8 sm:gap-10 md:gap-12 lg:gap-14 mx-auto"
        >
          {[
            { label: "民意反馈", value: "实时", icon: "📊", color: "cyan" },
            { label: "AI分析", value: "智能", icon: "🤖", color: "amber" },
            { label: "履职监督", value: "透明", icon: "🔍", color: "red" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="glass-card p-4 sm:p-5 md:p-6 lg:p-7 text-center hover-lift flex-1"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 block">
                {stat.icon}
              </span>
              <div
                className={`text-xl sm:text-2xl md:text-3xl font-bold mb-1 ${
                  stat.color === "cyan"
                    ? "text-cyan-600"
                    : stat.color === "amber"
                    ? "text-amber-600"
                    : "text-red-600"
                }`}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-slate-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute -bottom-12 md:-bottom-16 lg:-bottom-20 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-slate-400">向下滚动</span>
            <svg
              className="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
