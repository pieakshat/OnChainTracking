// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

export default async function fetchTransactions(address) {
    const config = {
        apiKey: "CNZyYw0fYYt7pHRPDsAwyadko5sSnHmc",
        network: Network.BASE_MAINNET,
    };
    const alchemy = new Alchemy(config);

    const data = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: address,
        category: ["external", "erc20", "erc721", "erc1155"],
    });

    console.log(data);
    return data;
}

// getTransactions("0x294eeED3dB92Df78460CbF21B1F3E07F138411Ce"); 