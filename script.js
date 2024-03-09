// Bernabe Macias
// Game Project
// 3/7/24

var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;
var gameOver = false;
var board;
var rows = 6;
var columns = 7;
var currColumns = [];

window.onload = function() {
    setGame();
    document.getElementById("reset").addEventListener("click", resetGame);
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    
    // Clear board and message
    document.getElementById("board").innerHTML = "";
    document.getElementById("message").innerText = "Let's play Connect 4!";
    gameOver = false;

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    r = currColumns[c]; 

    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1;
    currColumns[c] = r;

    checkWinner();
}

function checkWinner() {
    // checks for horizontal wins
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c <= columns - 4; c++) {
            if (board[r][c] !== ' ' && 
                board[r][c] === board[r][c+1] && 
                board[r][c] === board[r][c+2] && 
                board[r][c] === board[r][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // checks for vertical wins
    for (let r = 0; r <= rows - 4; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] !== ' ' && 
                board[r][c] === board[r+1][c] && 
                board[r][c] === board[r+2][c] && 
                board[r][c] === board[r+3][c]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // checks for diagonal wins 
    for (let r = 0; r <= rows - 4; r++) {
        for (let c = 0; c <= columns - 4; c++) {
            if (board[r][c] !== ' ' && 
                board[r][c] === board[r+1][c+1] && 
                board[r][c] === board[r+2][c+2] && 
                board[r][c] === board[r+3][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Check for diagonal wins (bottom-left to top-right)
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c <= columns - 4; c++) {
            if (board[r][c] !== ' ' && 
                board[r][c] === board[r-1][c+1] && 
                board[r][c] === board[r-2][c+2] && 
                board[r][c] === board[r-3][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Check for tie
    if (!gameOver && board.every(row => row.every(cell => cell !== ' '))) {
        document.getElementById("message").innerText = "It's a tie!";
        gameOver = true;
    }
}

function setWinner(r, c) {
    let winnerMessage = board[r][c] == playerRed ? "Grey Won :)" : "Maroon Won :)";
    document.getElementById("message").innerText = winnerMessage;
    gameOver = true;
}

function resetGame() {
    setGame();
}
