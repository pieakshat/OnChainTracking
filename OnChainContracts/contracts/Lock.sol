// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupporterRanking {
    mapping(address => uint256) public scores;
    address public admin;

    event ScoreUpdated(address indexed supporter, uint256 newScore);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function updateScore(address supporter, uint256 newScore) external onlyAdmin {
        scores[supporter] = newScore;
        emit ScoreUpdated(supporter, newScore);
    }

    function getScore(address supporter) external view returns (uint256) {
        return scores[supporter];
    }
}


