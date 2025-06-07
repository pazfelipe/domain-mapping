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
  port: 3000,
  routes: {
    "/resolve": {
      GET(req: Request) {
        const url = new URL(req.url);
        const domain = url.searchParams.get("domain");

        if (!domain) {
          return new Response("Missing domain param", { status: 400 });
        }

        const result = db
          .query("SELECT id FROM domains WHERE name = ?")
          .get(domain) as { id: string } | undefined;

        if (!result) {
          return new Response("Domain not found", { status: 404 });
        }

        return new Response(String(result.id), { status: 200 });
      },
    },
  },
});
