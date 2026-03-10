import Database from "better-sqlite3";

const db = new Database("database.db");

try {
  db.exec("ALTER TABLE gallery ADD COLUMN published INTEGER DEFAULT 1;");
  console.log("Added published column to gallery table");
} catch (e) {
  console.log("Gallery table already has published column or error:", e.message);
}

try {
  db.exec("ALTER TABLE videos ADD COLUMN published INTEGER DEFAULT 1;");
  console.log("Added published column to videos table");
} catch (e) {
  console.log("Videos table already has published column or error:", e.message);
}
