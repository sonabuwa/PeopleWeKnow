import dotenv from "dotenv"; // dotenv used to access the .env files variable here.
dotenv.config();
import cors from "cors";
import express from "express";
import path from "path";
import { connectDB } from "./src/config/db.js"; // connectDB created a connection with the databases and accessing the mongodb link from .env file.
import personRoutes from "./src/routes/personRoutes.js";
import People from "./src/routes/people.js";

const app = express();
connectDB();

app.use(express.json()); // VERY IMPORTANT- middleware
app.use(cors());

app.use("/api", personRoutes);
app.use("/api", People);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (_, res) => {
  return res.send("The server is Running...");
});

app.listen(process.env.PORT || 5005, () => {
  console.log("Server running on the port " + (process.env.PORT || 5005));
});
