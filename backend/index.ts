import Database from "bun:sqlite";

const db = new Database("domains.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS domains (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);

Bun.serve({
  routes: {
    "/resolve": {
      POST: async (req, res) => {
        return new Response("OK", {
          status: 200,
        });
      },
    },
  },
  port: 3000,
});
