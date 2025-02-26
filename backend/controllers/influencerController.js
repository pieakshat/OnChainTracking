import Influencer from "../models/influencer.js";

export const addInfluencer = async (req, res) => {
    try {
        const { influencerAddress, name } = req.body;
        const influencer = new Influencer({ influencerAddress, name, supporters: [] });
        await influencer.save();
        res.status(201).json(influencer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getInfluencers = async (req, res) => {
    try {
        const influencers = await Influencer.find();
        res.json(influencers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
