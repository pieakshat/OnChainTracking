import mongoose from "mongoose";

const InfluencerSchema = new mongoose.Schema({
    influencerAddress: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    supporters: [{ type: String }] // List of supporter addresses
});

const Influencer = mongoose.model("Influencer", InfluencerSchema);
export default Influencer;
