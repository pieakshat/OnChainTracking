// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

contract OnchainLeaderboard is Ownable {

    struct Action {
        uint256 weight; 
        bool isActive;
    }

    mapping (address => uint256) public supporterScores;    // tracks score for each supporter
    mapping (bytes32 => Action) public actionWeights;   // every action will have it's own hash
    address[] public supporters; 

    event ScoreUpdated(address indexed supporter, uint256 newScore);
    event ActionWeightUpdated(bytes32 indexed action, uint256 weight);


    constructor() Ownable(msg.sender) {}

        function setActionWeight(string memory action, uint256 weight, bool isActive) external onlyOwner {
        bytes32 actionHash = keccak256(abi.encodePacked(action));
        actionWeights[actionHash] = Action(weight, isActive);
        emit ActionWeightUpdated(actionHash, weight);
    }

        function trackAction(address supporter, string memory action) external onlyOwner {
        bytes32 actionHash = keccak256(abi.encodePacked(action));
        require(actionWeights[actionHash].isActive, "Action not active");

        uint256 weight = actionWeights[actionHash].weight;
        supporterScores[supporter] += weight;

        // Add supporter to list if first-time interaction
        if (supporterScores[supporter] == weight) {
            supporters.push(supporter);
        }

        emit ScoreUpdated(supporter, supporterScores[supporter]);
    }


        function getTopSupporters(uint256 count) external view returns (address[] memory) {
        address[] memory topSupporters = new address[](count);
        uint256[] memory topScores = new uint256[](count);

        for (uint256 i = 0; i < supporters.length; i++) {
            address supporter = supporters[i];
            uint256 score = supporterScores[supporter];

            // Insert supporter into top list
            for (uint256 j = 0; j < count; j++) {
                if (score > topScores[j]) {
                    for (uint256 k = count - 1; k > j; k--) {
                        topSupporters[k] = topSupporters[k - 1];
                        topScores[k] = topScores[k - 1];
                    }
                    topSupporters[j] = supporter;
                    topScores[j] = score;
                    break;
                }
            }
        }
        return topSupporters;
    }



}