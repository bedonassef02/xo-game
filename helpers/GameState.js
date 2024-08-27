class GameState {
    constructor() {
        this.availableIndexes = Array.from(Array(9).keys());
        this.board = Array(9).fill(null);
        this.playerXMoves = [];
        this.playerOMoves = [];
    }

    updateGameState(index, playerMoves, marker) {
        this.availableIndexes = this.availableIndexes.filter(i => i !== index);
        playerMoves.push(index);
        playerMoves.sort((a, b) => a - b); // Sort player moves
        this.board[index] = marker;
    }

    isMoveValid(index) {
        return this.availableIndexes.includes(index);
    }

    getBoard() {
        return this.board;
    }

    getAvailableIndexes() {
        return this.availableIndexes;
    }

    getPlayerMoves(marker) {
        return marker === 'X' ? this.playerXMoves : this.playerOMoves;
    }
}

module.exports = GameState;
