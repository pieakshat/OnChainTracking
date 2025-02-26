import express from "express";
import { addSupporter, updateSupporterScores } from "../controllers/supporterController.js";

const router = express.Router();
router.post("/add", addSupporter);
router.put("/update/:influencerAddress", updateSupporterScores);

export default router;
