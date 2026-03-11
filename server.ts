import express from "express";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
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

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL || "https://uhomwphvihjojavplcvb.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "sb_publishable_DT3N6nRTKKLVYBk2yZ1biA_aHbQ27-v";
const supabase = createClient(supabaseUrl, supabaseKey);

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

// Helper to get SMTP config from Supabase or Env
const getSmtpConfig = async () => {
  const { data: settings } = await supabase.from('settings').select('*');
  
  const getSetting = (key: string) => settings?.find(s => s.key === key)?.value;

  return {
    host: (getSetting('smtp_host') || process.env.SMTP_HOST || "smtp.gmail.com").replace(/^https?:\/\//, '').split('/')[0],
    port: parseInt(getSetting('smtp_port') || process.env.SMTP_PORT || "587"),
    secure: (getSetting('smtp_secure') || process.env.SMTP_SECURE) === "true",
    auth: {
      user: getSetting('smtp_user') || process.env.SMTP_USER,
      pass: getSetting('smtp_pass') || process.env.SMTP_PASS,
    },
  };
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // Admin Routes (Direct Password Auth)
  app.post("/api/admin/login", async (req, res) => {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || "079bizimanadjemmy@gmail.com";
    
    try {
      const { data: settings } = await supabase.from('settings').select('*').eq('key', 'admin_password').single();
      const adminPassword = settings?.value || process.env.ADMIN_PASSWORD || "073bizimana59";

      if (email === adminEmail && password === adminPassword) {
        res.json({ success: true, token: "mock-jwt-token" });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (error) {
      // Fallback to env if table doesn't exist yet
      const adminPassword = process.env.ADMIN_PASSWORD || "073bizimana59";
      if (email === adminEmail && password === adminPassword) {
        res.json({ success: true, token: "mock-jwt-token" });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    }
  });

  // API Routes

  app.get("/api/gallery", async (req, res) => {
    try {
      const { data: images, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('published', 1)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      res.json(images);
    } catch (error) {
      console.error("Failed to fetch gallery", error);
      res.status(500).json({ error: "Failed to fetch gallery" });
    }
  });

  app.get("/api/videos", async (req, res) => {
    try {
      const { data: videos, error } = await supabase
        .from('videos')
        .select('*')
        .eq('published', 1)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      res.json(videos);
    } catch (error) {
      console.error("Failed to fetch videos", error);
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  app.get("/api/reviews", async (req, res) => {
    try {
      const { data: reviews, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('published', 1)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    const { name, rating, comment } = req.body;
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([{ name, rating, comment }]);
      
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit review" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    const { name, phone, date, message } = req.body;
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{ name, phone, date, message }])
        .select();
      
      if (error) throw error;
      res.json({ success: true, id: data?.[0]?.id });
    } catch (error) {
      res.status(500).json({ error: "Failed to save booking" });
    }
  });

  app.post("/api/admin/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
  });

  app.post("/api/admin/change-password", async (req, res) => {
    const { newPassword } = req.body;
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ key: 'admin_password', value: newPassword });
      
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update password" });
    }
  });

  app.get("/api/admin/smtp-settings", async (req, res) => {
    const config = await getSmtpConfig();
    res.json(config);
  });

  app.post("/api/admin/smtp-settings", async (req, res) => {
    const { host, port, user, pass, secure } = req.body;
    try {
      const updates = [
        { key: 'smtp_host', value: host },
        { key: 'smtp_port', value: port.toString() },
        { key: 'smtp_user', value: user },
        { key: 'smtp_secure', value: secure ? "true" : "false" }
      ];
      if (pass) updates.push({ key: 'smtp_pass', value: pass });

      const { error } = await supabase.from('settings').upsert(updates);
      
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update SMTP settings" });
    }
  });

  app.post("/api/admin/test-email", async (req, res) => {
    const smtpConfig = await getSmtpConfig();
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

  app.get("/api/admin/gallery", async (req, res) => {
    try {
      const { data: images, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery" });
    }
  });

  app.patch("/api/admin/gallery/:id/publish", async (req, res) => {
    const { id } = req.params;
    const { published } = req.body;
    try {
      const { error } = await supabase
        .from('gallery')
        .update({ published: published ? 1 : 0 })
        .eq('id', id);
      
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update image visibility" });
    }
  });

  app.put("/api/admin/gallery/:id", async (req, res) => {
    const { id } = req.params;
    const { title, published } = req.body;
    try {
      const { error } = await supabase
        .from('gallery')
        .update({ title, published: published ? 1 : 0 })
        .eq('id', id);
      
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update image" });
    }
  });

  app.get("/api/admin/videos", async (req, res) => {
    try {
      const { data: videos, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  app.patch("/api/admin/videos/:id/publish", async (req, res) => {
    const { id } = req.params;
    const { published } = req.body;
    try {
      const { error } = await supabase
        .from('videos')
        .update({ published: published ? 1 : 0 })
        .eq('id', id);
      
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update video visibility" });
    }
  });

  app.put("/api/admin/videos/:id", async (req, res) => {
    const { id } = req.params;
    const { title, published } = req.body;
    try {
      const { error } = await supabase
        .from('videos')
        .update({ title, published: published ? 1 : 0 })
        .eq('id', id);
      
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update video" });
    }
  });

  app.get("/api/admin/bookings", async (req, res) => {
    try {
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.get("/api/admin/reviews", async (req, res) => {
    try {
      const { data: reviews, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/admin/reviews", async (req, res) => {
    const { name, rating, comment, published } = req.body;
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([{ name, rating, comment, published: published ? 1 : 0 }]);
      
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to add review" });
    }
  });

  app.patch("/api/admin/reviews/:id/publish", async (req, res) => {
    const { id } = req.params;
    const { published } = req.body;
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ published: published ? 1 : 0 })
        .eq('id', id);
      
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update review" });
    }
  });

  app.delete("/api/admin/reviews/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  app.post("/api/admin/gallery", async (req, res) => {
    const { src, title, published } = req.body;
    try {
      const { data, error } = await supabase
        .from('gallery')
        .insert([{ src, title, published: published !== undefined ? (published ? 1 : 0) : 1 }])
        .select();
      
      if (error) throw error;
      res.json({ success: true, id: data?.[0]?.id });
    } catch (error) {
      res.status(500).json({ error: "Failed to add image" });
    }
  });

  app.delete("/api/admin/gallery/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete image" });
    }
  });

  app.post("/api/admin/videos", async (req, res) => {
    const { url, title, published } = req.body;
    try {
      const { data, error } = await supabase
        .from('videos')
        .insert([{ url, title, published: published !== undefined ? (published ? 1 : 0) : 1 }])
        .select();
      
      if (error) throw error;
      res.json({ success: true, id: data?.[0]?.id });
    } catch (error) {
      res.status(500).json({ error: "Failed to add video" });
    }
  });

  app.delete("/api/admin/videos/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
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
