import { Router } from "express";
import { pool } from "../config/db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        issue_id,
        title,
        description,
        status,
        priority,
        reported_by,
        created_at,
        updated_at
      FROM issues
      ORDER BY created_at DESC;
    `);

    res.status(200).json({
      count: result.rows.length,
      issues: result.rows,
    });
  } catch (error) {
    console.error("Error fetching issues:", error);

    res.status(500).json({
      error: "Failed to fetch issues",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;
