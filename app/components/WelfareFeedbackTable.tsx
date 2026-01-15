"use client";

import { motion } from "framer-motion";
import { Table, Tag, Tooltip, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";

interface WelfareFeedbackItem {
  key: string;
  public_welfare: string;
  issuer: string;
  community: string;
}

interface WelfareFeedbackTableProps {
  data: Array<{
    public_welfare: string;
    issuer: string;
    community: string;
  }>;
}

export default function WelfareFeedbackTable({
  data,
}: WelfareFeedbackTableProps) {
  // Mask issuer: show first 5 characters, rest as asterisks
  const maskIssuer = (issuer: string): string => {
    if (!issuer) return "";
    if (issuer.length <= 5) return issuer;
    return issuer.slice(0, 5) + "*".repeat(issuer.length - 5);
  };

  const tableData: WelfareFeedbackItem[] = data.map((item, index) => ({
    key: String(index),
    public_welfare: item.public_welfare,
    issuer: maskIssuer(item.issuer || ""),
    community: item.community,
  }));

  const columns: ColumnsType<WelfareFeedbackItem> = [
    {
      title: "民生实事建议",
      dataIndex: "public_welfare",
      key: "public_welfare",
      width: "50%",
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
      title: "提交人",
      dataIndex: "issuer",
      key: "issuer",
      width: "20%",
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
            {text || "-"}
          </Tag>
        ) : (
          ""
        ),
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-transparent via-blue-50/30 to-transparent">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-5 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-5">
            2026年民生实事
          </span>
          <h2
            style={{ margin: "16px" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 md:mb-5"
          >
            街道民生实事<span className="text-blue-500">征集</span>
          </h2>
          <p className="text-slate-500 flex items-center justify-center text-base sm:text-lg">
            广泛征集民意，聚焦民生热点，共建美好家园
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
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                    民生实事征集列表
                  </h3>
                </div>
              </div>
              <div className="sm:ml-auto flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-400 bg-blue-50 px-4 py-2 rounded-full">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
                  </span>
                  <span className="text-blue-600 font-medium">
                    共 {data.length} 条征集建议
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
                    headerBg: "rgba(59, 130, 246, 0.04)",
                    headerColor: "#1e293b",
                    rowHoverBg: "rgba(59, 130, 246, 0.02)",
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
                    <span className="text-slate-500">共 {total} 条建议</span>
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
