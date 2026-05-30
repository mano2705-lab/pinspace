import dotenv from "dotenv";

dotenv.config({ path: "../server/.env" });

import express from "express";
import cors from "cors";
import likeRoutes from "./routes/likeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pinRoutes from "./routes/pinRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/likes", likeRoutes);

app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.use("/api/pins", pinRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
