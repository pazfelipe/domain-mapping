import database from "node:sqlite";
import express, { type Request, type Response } from "express";

const { DatabaseSync } = database;

const db = new DatabaseSync("domains.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS domains (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);

const app = express();
app.use(express.json());

app.get("/resolve", (req: Request, res: Response) => {
  const domain = req.query.domain as string;

  if (!domain) {
    return res.status(400).json({ error: "Missing domain param" });
  }

  const result = db
    .prepare("SELECT id FROM domains WHERE name = ?")
    .get(domain) as { id: string } | undefined;

  if (!result) {
    return res.status(404).json({ error: "Domain not found" });
  }

  return res.status(200).json({ id: result.id });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
