import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "hkg1.clusters.zeabur.com",
  port: 30671,
  user: "root",
  password: "qYtMZwRpGHXd2jaomn9O580rVWQ73614",
  database: "zeabur",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export interface FeedbackRecord {
  id: number;
  content: string;
  create_time: Date;
  issue_category?: string;
  issuer?: string;
  community?: string;
  status?: string;
  issue_fixer?: string;
}

export interface WelfareFeedbackRecord {
  public_welfare: string;
  issuer?: string;
  community?: string;
}

export async function getAllFeedback(): Promise<FeedbackRecord[]> {
  const [rows] = await pool.execute(
    "SELECT id, content, create_time, issue_category, issuer, community, status, issue_fixer FROM renda_feedback ORDER BY create_time DESC"
  );
  return rows as FeedbackRecord[];
}

export async function updateFeedbackStatus(
  id: number,
  status: string,
  issue_fixer: string
): Promise<boolean> {
  try {
    await pool.execute(
      "UPDATE renda_feedback SET status = ?, issue_fixer = ? WHERE id = ?",
      [status, issue_fixer, id]
    );
    return true;
  } catch (error) {
    console.error("Failed to update feedback status:", error);
    return false;
  }
}

export async function getAllWelfareFeedback(): Promise<
  WelfareFeedbackRecord[]
> {
  const [rows] = await pool.execute(
    "SELECT public_welfare, issuer, community FROM welfare_feedback"
  );
  return rows as WelfareFeedbackRecord[];
}

export default pool;
