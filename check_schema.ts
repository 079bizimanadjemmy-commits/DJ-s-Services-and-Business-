import Database from "better-sqlite3";

const db = new Database("database.db");

const galleryInfo = db.prepare("PRAGMA table_info(gallery)").all();
console.log("Gallery Table Info:", galleryInfo);

const videosInfo = db.prepare("PRAGMA table_info(videos)").all();
console.log("Videos Table Info:", videosInfo);
