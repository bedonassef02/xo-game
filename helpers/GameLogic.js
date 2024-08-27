const { winningLines } = require('../constants/index');

class GameLogic {
    constructor(gameState) {
        this.gameState = gameState;
    }

    checkWinner(playerMoves, marker) {
        if (winningLines.some(line => line.every(pos => playerMoves.includes(pos)))) {
            console.log(`Winner: ${marker}!!!`);
            return true;
        }
        return false;
    }

    generateRandomIndex() {
        const indexes = this.gameState.getAvailableIndexes();
        const randomIndex = Math.floor(Math.random() * indexes.length);
        return indexes[randomIndex];
    }
}

module.exports = GameLogic;
