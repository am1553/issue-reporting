import "dotenv/config";
import express from "express";
import cors from "cors";
import issuesRouter from "./routes/issues";
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});
app.use("/api/issues", issuesRouter);

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
