// ✅ FIX 1: Import dotenv like this in ES Modules so it loads BEFORE other imports
import "dotenv/config";

import cors from "cors";
import express from "express";
import path from "path";
import { connectDB } from "./src/config/db.js";

// ⚠️ Make sure you import your AUTH/LOGIN routes here!
// import authRoutes from "./src/routes/authRoutes.js";

import personRoutes from "./src/routes/personRoutes.js";
import People from "./src/routes/people.js";

const app = express();

// ✅ FIX 2: Wrap DB connection in a try/catch so it doesn't silently crash the server
try {
  await connectDB();
  console.log("✅ Database connected successfully");
} catch (error) {
  console.error("❌ FATAL DATABASE ERROR:", error.message);
  process.exit(1); // Stop the server if DB fails
}

app.use(express.json());
app.use(cors());

// Register your routes
// app.use("/api/auth", authRoutes); // <-- Add your login route here!
app.use("/api", personRoutes);
app.use("/api", People);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (_, res) => {
  return res.send("The server is Running...");
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
