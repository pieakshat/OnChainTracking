import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import influencerRoutes from "./routes/influencerRoutes.js";
import supporterRoutes from "./routes/supporterRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/influencers", influencerRoutes);
app.use("/api/supporters", supporterRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
