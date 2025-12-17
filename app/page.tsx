import { getAllFeedback } from "@/lib/db";
import HeroSection from "./components/HeroSection";
import ChartsSection from "./components/ChartsSection";
import WordCloud from "./components/WordCloud";
import FeedbackTable from "./components/FeedbackTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  // Fetch data from MySQL
  const feedbackData = await getAllFeedback();

  // Serialize dates for client components
  const serializedFeedback = feedbackData.map((item) => ({
    content: item.content,
    create_time: item.create_time.toISOString(),
  }));

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Charts Section - Now using static structured data */}
      <ChartsSection />

      {/* Word Cloud Section */}
      <WordCloud />

      {/* Feedback Table - Real-time data from MySQL */}
      <FeedbackTable data={serializedFeedback} />

      {/* Footer */}
      <footer className="py-12 sm:py-16 px-4 bg-gradient-to-t from-slate-50 to-transparent">
        <div className="container-responsive">
          <div className="footer-gradient mb-8 sm:mb-10" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-slate-700">
                人大长庆街道工委 · 智慧履职平台
              </span>
            </div>
            <p className="text-slate-400 text-sm flex items-center justify-center gap-3 flex-wrap">
              <span>© {new Date().getFullYear()} 杭州市拱墅区长庆街道</span>
              <span className="hidden sm:inline text-slate-300">·</span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                AI赋能
              </span>
              <span className="hidden sm:inline text-slate-300">·</span>
              <span>民意直达</span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
