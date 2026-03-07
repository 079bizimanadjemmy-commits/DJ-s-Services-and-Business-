import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import nodemailer from "nodemailer";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const db = new Database("database.db");

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    date TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    src TEXT,
    title TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT,
    title TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    rating INTEGER,
    comment TEXT,
    published INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed gallery if empty
const galleryCount = db.prepare("SELECT COUNT(*) as count FROM gallery").get() as { count: number };
if (galleryCount.count === 0) {
  const seedImages = [
    { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop", title: "DJ Performing" },
    { src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop", title: "Dance Floor" },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop", title: "Wedding Celebration" },
    { src: "https://images.unsplash.com/photo-1514525253361-bee8718a340b?q=80&w=1974&auto=format&fit=crop", title: "DJ Equipment" },
    { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop", title: "Event Lighting" },
    { src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop", title: "Party Atmosphere" },
  ];
  const insert = db.prepare("INSERT INTO gallery (src, title) VALUES (?, ?)");
  seedImages.forEach(img => insert.run(img.src, img.title));
}

// Seed default password if not set
const adminPass = db.prepare("SELECT value FROM settings WHERE key = 'admin_password'").get() as { value: string } | undefined;
if (!adminPass) {
  db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run('admin_password', process.env.ADMIN_PASSWORD || 'admin123');
}

// Helper to get SMTP config from DB or Env
const getSmtpConfig = () => {
  const host = db.prepare("SELECT value FROM settings WHERE key = 'smtp_host'").get() as { value: string } | undefined;
  const port = db.prepare("SELECT value FROM settings WHERE key = 'smtp_port'").get() as { value: string } | undefined;
  const user = db.prepare("SELECT value FROM settings WHERE key = 'smtp_user'").get() as { value: string } | undefined;
  const pass = db.prepare("SELECT value FROM settings WHERE key = 'smtp_pass'").get() as { value: string } | undefined;
  const secure = db.prepare("SELECT value FROM settings WHERE key = 'smtp_secure'").get() as { value: string } | undefined;

  return {
    host: (host?.value || process.env.SMTP_HOST || "smtp.gmail.com").replace(/^https?:\/\//, '').split('/')[0],
    port: parseInt(port?.value || process.env.SMTP_PORT || "587"),
    secure: (secure?.value || process.env.SMTP_SECURE) === "true",
    auth: {
      user: user?.value || process.env.SMTP_USER,
      pass: pass?.value || process.env.SMTP_PASS,
    },
  };
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // API Routes
  app.post("/api/admin/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
  });

  app.get("/api/gallery", (req, res) => {
    const images = db.prepare("SELECT * FROM gallery ORDER BY created_at DESC").all();
    res.json(images);
  });

  app.get("/api/videos", (req, res) => {
    const videos = db.prepare("SELECT * FROM videos ORDER BY created_at DESC").all();
    res.json(videos);
  });

  app.get("/api/reviews", (req, res) => {
    const reviews = db.prepare("SELECT * FROM reviews WHERE published = 1 ORDER BY created_at DESC").all();
    res.json(reviews);
  });

  app.post("/api/reviews", (req, res) => {
    const { name, rating, comment } = req.body;
    try {
      db.prepare("INSERT INTO reviews (name, rating, comment) VALUES (?, ?, ?)").run(name, rating, comment);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit review" });
    }
  });

  app.post("/api/bookings", (req, res) => {
    const { name, phone, date, message } = req.body;
    try {
      const info = db.prepare("INSERT INTO bookings (name, phone, date, message) VALUES (?, ?, ?, ?)").run(name, phone, date, message);
      res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: "Failed to save booking" });
    }
  });

  // Admin Routes (Direct Password Auth)
  app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || "079bizimanadjemmy@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "073bizimana59";

    if (email === adminEmail && password === adminPassword) {
      res.json({ success: true, token: "mock-jwt-token" });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  });

  app.post("/api/admin/change-password", (req, res) => {
    const { newPassword } = req.body;
    try {
      db.prepare("UPDATE settings SET value = ? WHERE key = 'admin_password'").run(newPassword);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update password" });
    }
  });

  app.get("/api/admin/smtp-settings", (req, res) => {
    const config = getSmtpConfig();
    res.json(config);
  });

  app.post("/api/admin/smtp-settings", (req, res) => {
    const { host, port, user, pass, secure } = req.body;
    try {
      const upsert = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
      upsert.run('smtp_host', host);
      upsert.run('smtp_port', port.toString());
      upsert.run('smtp_user', user);
      if (pass) upsert.run('smtp_pass', pass);
      upsert.run('smtp_secure', secure ? "true" : "false");
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update SMTP settings" });
    }
  });

  app.post("/api/admin/test-email", async (req, res) => {
    const smtpConfig = getSmtpConfig();
    if (!smtpConfig.auth.user) {
      return res.status(400).json({ error: "SMTP User not configured" });
    }

    try {
      const transporter = nodemailer.createTransport(smtpConfig);
      await transporter.sendMail({
        from: `"DJ'S SERVICES Test" <${smtpConfig.auth.user}>`,
        to: smtpConfig.auth.user,
        subject: "SMTP Test Connection",
        text: "If you are reading this, your SMTP settings are working correctly!",
      });
      res.json({ success: true });
    } catch (error) {
      console.error("SMTP Test Failed", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "SMTP Test Failed" });
    }
  });

  app.get("/api/admin/bookings", (req, res) => {
    const bookings = db.prepare("SELECT * FROM bookings ORDER BY created_at DESC").all();
    res.json(bookings);
  });

  app.get("/api/admin/reviews", (req, res) => {
    const reviews = db.prepare("SELECT * FROM reviews ORDER BY created_at DESC").all();
    res.json(reviews);
  });

  app.patch("/api/admin/reviews/:id/publish", (req, res) => {
    const { id } = req.params;
    const { published } = req.body;
    try {
      db.prepare("UPDATE reviews SET published = ? WHERE id = ?").run(published ? 1 : 0, id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update review" });
    }
  });

  app.delete("/api/admin/reviews/:id", (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM reviews WHERE id = ?").run(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  app.post("/api/admin/gallery", (req, res) => {
    const { src, title } = req.body;
    try {
      const info = db.prepare("INSERT INTO gallery (src, title) VALUES (?, ?)").run(src, title);
      res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: "Failed to add image" });
    }
  });

  app.delete("/api/admin/gallery/:id", (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM gallery WHERE id = ?").run(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete image" });
    }
  });

  app.post("/api/admin/videos", (req, res) => {
    const { url, title } = req.body;
    try {
      const info = db.prepare("INSERT INTO videos (url, title) VALUES (?, ?)").run(url, title);
      res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: "Failed to add video" });
    }
  });

  app.delete("/api/admin/videos/:id", (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM videos WHERE id = ?").run(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete video" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
