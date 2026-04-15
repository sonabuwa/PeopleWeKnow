import express from "express";
import dotenv from "dotenv"; // dotenv used to access the .env files variable here.
import { connectDB } from "./src/config/db.js"; // connectDB created a connection with the databases and accessing the mongodb link from .env file.
import cors from "cors";
import personRoutes from "./src/routes/personRoutes.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json()); // VERY IMPORTANT
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api", personRoutes);
app.get("/", (_, res) => {
  return res.send("The server is Running...");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on the port" + process.env.PORT);
});
