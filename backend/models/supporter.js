import mongoose from "mongoose";
const SupporterSchema = new mongoose.Schema({
    address: { type: String, required: true },
    influencerAddress: { type: String, required: true },
    actions: {
        base_colors_collected: { type: Number, default: 0 },
        pods_collected: { type: Number, default: 0 },
        zora_posts_collected: { type: Number, default: 0 },
        clankers_bought: { type: Number, default: 0 },
        tips_sent: { type: Number, default: 0 }
    },
    weights: {
        base_colors_collected: { type: Number, default: 2 },
        pods_collected: { type: Number, default: 3 },
        zora_posts_collected: { type: Number, default: 1 },
        clankers_bought: { type: Number, default: 4 },
        tips_sent: { type: Number, default: 5 }
    },
    score: { type: Number, default: 0 }
});

const Supporter = mongoose.model("Supporter", SupporterSchema);
export default Supporter;
