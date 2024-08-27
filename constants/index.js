// constants/index.js

// Define the winning lines
const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Initialize game state
let playerXMoves = [];
let playerOMoves = [];
let availableIndexes = Array.from(Array(9).keys());
let board = Array(9).fill(null);

module.exports = { winningLines, playerOMoves, playerXMoves, availableIndexes, board };
