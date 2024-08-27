const { of, from } = require('rxjs');
const { concatMap, takeWhile, finalize } = require('rxjs/operators');
const GameState = require('./GameState');
const GameLogic = require('./GameLogic');

class XOGame {
    constructor() {
        this.gameState = new GameState();
        this.gameLogic = new GameLogic(this.gameState);
    }

    playMove(index, playerMoves, marker) {
        if (this.gameState.isMoveValid(index)) {
            this.gameState.updateGameState(index, playerMoves, marker);
            this.logBoard();
            return this.gameLogic.checkWinner(playerMoves, marker);
        } else {
            console.error("ERROR: Index not available");
            return false;
        }
    }

    logBoard() {
        const board = this.gameState.getBoard();
        console.log(`
         ${board[0] || ' '} | ${board[1] || ' '} | ${board[2] || ' '}
        -----------
         ${board[3] || ' '} | ${board[4] || ' '} | ${board[5] || ' '}
        -----------
         ${board[6] || ' '} | ${board[7] || ' '} | ${board[8] || ' '}
        `);
    }

    handleTurn(playerMoves, marker) {
        const move = this.gameLogic.generateRandomIndex();
        return this.playMove(move, playerMoves, marker);
    }

    startGame() {
        from(Array(9).keys()).pipe(
            concatMap(turn => {
                const xMoves = this.gameState.getPlayerMoves('X');
                const xWon = this.handleTurn(xMoves, 'X');
                if (xWon || this.gameState.getAvailableIndexes().length === 0) {
                    return of({ xWon, draw: this.gameState.getAvailableIndexes().length === 0 });
                }

                const oMoves = this.gameState.getPlayerMoves('O');
                const oWon = this.handleTurn(oMoves, 'O');
                return of({ oWon, draw: this.gameState.getAvailableIndexes().length === 0 });
            }),
            takeWhile(({ xWon, oWon, draw }) => !xWon && !oWon && !draw, true),
            finalize(() => {
                if (this.gameState.getAvailableIndexes().length === 0 && this.gameState.getPlayerMoves('X').length + this.gameState.getPlayerMoves('O').length === 9) {
                    console.log("It's a draw!");
                }
            })
        ).subscribe();
    }
}

module.exports = XOGame;