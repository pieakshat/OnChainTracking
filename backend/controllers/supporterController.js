import Supporter from "../models/supporter.js";
import Influencer from "../models/influencer.js";
import fetchTransactions from "../utils/fetchTransactions.js";

export const addSupporter = async (req, res) => {
    try {
        const { influencerAddress, supporterAddress } = req.body;

        const influencer = await Influencer.findOne({ influencerAddress });
        if (!influencer) return res.status(404).json({ message: "Influencer not found" });

        const supporter = new Supporter({ address: supporterAddress, influencerAddress });
        await supporter.save();

        influencer.supporters.push(supporterAddress);
        await influencer.save();

        res.status(201).json(supporter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSupporterScores = async (req, res) => {
    try {
        const { influencerAddress } = req.params;
        const influencer = await Influencer.findOne({ influencerAddress });

        if (!influencer) return res.status(404).json({ message: "Influencer not found" });

        for (const supporterAddress of influencer.supporters) {
            const supporter = await Supporter.findOne({ address: supporterAddress, influencerAddress });
            if (!supporter) continue;

            const transactions = await fetchTransactions(supporter.address);

            let actions = { ...supporter.actions };

            // need to find the right addresses for the intercation with the particular contracts

            transactions.forEach(tx => {
                if (tx.to.toLowerCase() === "0x7Bc1C072742D8391817EB4Eb2317F98dc72C61dB") actions.base_colors_collected += 1;   // base colors contract address
                if (tx.to.toLowerCase() === "pods_contract_address") actions.pods_collected += 1;
                if (tx.to.toLowerCase() === "0xd8e3fb3b08eba982f2754988d70d57edc0055ae6") actions.zora_posts_collected += 1; // zora contract address
                if (tx.to.toLowerCase() === "0x0Ba1cd1DF6F08c02692355C697bd989F062D7167") actions.clankers_bought += 1; // clank.fun contract address
                if (tx.to.toLowerCase() === "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed") actions.tips_sent += 1;   // degen tips transfers
            });

            let newScore = Object.keys(actions).reduce((sum, key) => sum + actions[key] * supporter.weights[key], 0);

            await Supporter.updateOne({ address: supporterAddress, influencerAddress }, { $set: { actions, score: newScore } });
        }

        res.json({ message: "Supporter scores updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
