import express from "express";
import { addInfluencer, getInfluencers } from "../controllers/influencerController.js";

const router = express.Router();
router.post("/add", addInfluencer);
router.get("/", getInfluencers);

export default router;
