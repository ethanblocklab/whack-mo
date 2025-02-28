// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/**
 * @title WhackAMo
 * @dev A contract that simulates a Whack-a-Mo game where players can earn points
 */
contract WhackAMo {
    // Mapping from player address to their points
    mapping(address => uint256) public playerPoints;
    
    // Event emitted when a player whacks a mo
    event MoWhacked(address indexed player, uint256 points, uint256 newTotalPoints);
        
    /**
     * @dev Allows a player to whack a mo and earn points
     */
    function whackMo() external {        
        // Update the player's points
        playerPoints[msg.sender] += 1;
        
        emit MoWhacked(msg.sender, 1, playerPoints[msg.sender]);
    }
    
    /**
     * @dev Gets the points for a specific player
     * @param player The address of the player
     * @return The player's points
     */
    function getPoints(address player) external view returns (uint256) {
        return playerPoints[player];
    }
    
} 