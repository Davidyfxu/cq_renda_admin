"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Table, Tag, Tooltip, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatDate, generateAITag } from "@/lib/dataProcessing";

interface FeedbackItem {
  key: string;
  content: string;
  create_time: string;
  issue_category: string;
  issuer: string;
  aiTag: { label: string; color: string };
}

interface FeedbackRecord {
  content: string;
  create_time: string;
  issue_category: string;
  issuer: string;
  community: string;
}

interface FeedbackTableProps {
  data: Array<{
    content: string;
    create_time: Date | string;
    community: string;
    issue_category: string;
    issuer: string;
  }>;
}

const POLLING_INTERVAL = 30 * 1000; // 30 seconds

export default function FeedbackTable({
  data: initialData,
}: FeedbackTableProps) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchFeedback = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/feedback");
      if (response.ok) {
        const newData: FeedbackRecord[] = await response.json();
        setData(newData);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Set up polling interval
    const intervalId = setInterval(fetchFeedback, POLLING_INTERVAL);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [fetchFeedback]);

  // Mask issuer: show first 5 characters, rest as asterisks
  const maskIssuer = (issuer: string): string => {
    if (!issuer) return "";
    if (issuer.length <= 5) return issuer;
    return issuer.slice(0, 5) + "*".repeat(issuer.length - 5);
  };

  const tableData: FeedbackItem[] = data.map((item, index) => ({
    key: String(index),
    content: item.content,
    create_time: formatDate(item.create_time),
    community: item?.community || "",
    issue_category: item.issue_category || "",
    issuer: maskIssuer(item.issuer || ""),
    aiTag: generateAITag(item.content, index),
  }));

  const columns: ColumnsType<FeedbackItem> = [
    {
      title: "反馈内容",
      dataIndex: "content",
      key: "content",
      width: "35%",
      render: (text: string) => (
        <Tooltip
          title={text}
          placement="topLeft"
          overlayStyle={{ maxWidth: 400 }}
        >
          <span className="line-clamp-2 text-slate-700">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "提交时间",
      dataIndex: "create_time",
      key: "create_time",
      width: "14%",
      responsive: ["sm"],
      render: (text: string) => (
        <span className="text-slate-500 font-mono text-sm">{text}</span>
      ),
    },
    {
      title: "问题分类",
      dataIndex: "issue_category",
      key: "issue_category",
      width: "12%",
      align: "center",
      render: (text: string) =>
        text ? (
          <Tag
            style={{
              backgroundColor: "#f0fdf4",
              borderColor: "#22c55e",
              color: "#16a34a",
              fontWeight: 500,
              padding: "4px 12px",
            }}
          >
            {text}
          </Tag>
        ) : (
          ""
        ),
    },
    {
      title: "提问人",
      dataIndex: "issuer",
      key: "issuer",
      width: "10%",
      align: "center",
      render: (text: string) => (
        <span className="text-slate-600 font-medium">{text || "-"}</span>
      ),
    },
    {
      title: "所属辖区",
      dataIndex: "community",
      key: "community",
      align: "center",
      render: (text: string) =>
        text ? (
          <Tag
            style={{
              backgroundColor: "#eff6ff",
              borderColor: "#3b82f6",
              color: "#2563eb",
              fontWeight: 500,
              padding: "4px 12px",
            }}
          >
            {text}
          </Tag>
        ) : (
          ""
        ),
    },
    {
      title: "处理状态",
      key: "status",
      width: "20%",
      align: "center",
      render: (_, record) => {
        const statusIndex = Number.parseInt(record.key) % 2;
        const statuses = [
          // { text: "已处理", color: "#059669", bg: "#d1fae5" },
          { text: "处理中", color: "#d97706", bg: "#fef3c7" },
          { text: "待审核", color: "#0891b2", bg: "#cffafe" },
        ];
        const status = statuses[statusIndex];
        return (
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: status.bg, color: status.color }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: status.color }}
            />
            {status.text}
          </span>
        );
      },
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-transparent via-slate-50/50 to-transparent">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-5 py-2 bg-amber-50 text-amber-600 text-sm font-medium rounded-full mb-5">
            实时数据
          </span>
          <h2
            style={{ margin: "16px" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 md:mb-5"
          >
            实时民意<span className="text-amber-500">反馈</span>
          </h2>
          <p className="text-slate-500 flex items-center justify-center text-base sm:text-lg">
            群众心声实时汇聚，AI智能分类，快速响应民生诉求
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            style={{ padding: 16 }}
            className="glass-card p-5 sm:p-6 md:p-8 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 md:mb-8">
              <div className="flex items-center gap-4">
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
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                    群众反馈列表
                  </h3>
                </div>
              </div>
              <div className="sm:ml-auto flex items-center gap-3">
                {isLoading && (
                  <div className="flex items-center gap-2 text-sm text-blue-500 bg-blue-50 px-3 py-1.5 rounded-full">
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span className="font-medium">加载中...</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-slate-400 bg-green-50 px-4 py-2 rounded-full">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="text-green-600 font-medium">
                    每30秒自动刷新 · {lastUpdated.toLocaleTimeString("zh-CN")}
                  </span>
                </div>
              </div>
            </div>

            <ConfigProvider
              theme={{
                token: {
                  colorBgContainer: "transparent",
                  colorBorderSecondary: "rgba(0,0,0,0.06)",
                  colorText: "#334155",
                  colorTextSecondary: "#64748b",
                  borderRadius: 12,
                  fontFamily: "inherit",
                },
                components: {
                  Table: {
                    headerBg: "rgba(220, 38, 38, 0.04)",
                    headerColor: "#1e293b",
                    rowHoverBg: "rgba(220, 38, 38, 0.02)",
                    colorBgContainer: "transparent",
                    headerSplitColor: "transparent",
                    borderColor: "rgba(0,0,0,0.04)",
                  },
                },
              }}
            >
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: false,
                  showQuickJumper: true,
                  showTotal: (total) => (
                    <span className="text-slate-500">共 {total} 条反馈</span>
                  ),
                }}
                scroll={{ x: 600 }}
                className="custom-light-table"
              />
            </ConfigProvider>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
