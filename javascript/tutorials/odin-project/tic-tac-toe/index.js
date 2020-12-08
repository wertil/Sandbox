class Player {
    constructor(name, icon) {
        this.name = name;
        this.cells = [];
        this.wins = 0;
        this.icon = icon
    }
}
const player1 = new Player('Tilo', 'x');
const player2 = new Player('Inia', 'o');
let gameBoard = [];
const players = [player1, player2];
let activePlayer = 0;
let winningRow = null;
let activeGame = false;
let rowNumber = 3;

document.querySelector('.reset').addEventListener('click', () => {
    game.startNewGame();
})

document.querySelector('.update').addEventListener('click', () => {
    rowNumber = parseInt(document.querySelector('.row-input').value);
    game.startNewGame();
})


const game = (() => {

    let winnerRows = []

    const playGrid = document.querySelector('.play-grid');

    const createWinnerRows = function (rows) {
        let squareNo = 0;
        console.log(rows);
        const diagonalLeftRow = winnerRows[rows * 2 ] = [];
        const diagonalRightRow = winnerRows[rows * 2 + 1] = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < rows; j++) {
                squareNo++;
                const addCell = {no: squareNo, icon: null}

                // create horizontal rows:
                if (!winnerRows[i]) winnerRows[i] = [];
                winnerRows[i].push(addCell);

                // create vertical rows:
                const verticalRows = rows + j;
                if (!winnerRows[verticalRows]) winnerRows[verticalRows] = [];
                winnerRows[verticalRows].push(addCell);

                // create diagonal row from left
                if (i === j) diagonalLeftRow.push(addCell);

                // create diagonal row from right
                if (j === (rows - 1 - i)) diagonalRightRow.push(addCell);
            }
        }
        console.log({winnerRows});
    }

    const createBoard = function (rows) {
        if (!isNaN(rows)) {
            for (let i = 0; i < rows * rows; i++) {
                gameBoard[i] = null
            }
        }
        playGrid.setAttribute("style", `grid-template-columns: repeat(${rows}, 1fr);`);
        createWinnerRows(rows);
        activeGame = true;
    }

    const checkForWinner = function () {
        function isWinner(val, i, arr) {
            return val.icon === arr[0].icon && val.icon !== null;
        }
        for(let i=0; i < winnerRows.length; i++) {
            if(winnerRows[i].every(isWinner)) {
                winningRow = winnerRows[i];
                activeGame = false;
                return true;
            }
        }
    }

    const updateBoard = function () {
        let html = '';
        let squareNo = 0;
        // check for winner:


        // going through each row of the Game Board
        gameBoard.forEach(cell => {
            // drawing the html for each cell
            squareNo++;
            let markerClass = 'empty', winnerClass = '';
            if (cell) {
                markerClass = "mark-" + cell;
            }
            if(winningRow && winningRow.some(el => el.no === squareNo)) {
                winnerClass = "winner"
            }
            html += `<div class="square-${squareNo} ${markerClass} ${winnerClass}" data-cell="${squareNo}"></div>`;
        })
        playGrid.innerHTML = html;
        if(activeGame) playGame();
        console.log({gameBoard});
        console.log(player1, player2);
        console.log({winnerRows});
    }

    const updateWinningRows = function (arr, target) {
        return arr.map(function (rows) {
            return rows.map(function (cell) {
                if (cell.no == target) {
                    return ({
                        no: cell.no,
                        icon: players[activePlayer].icon
                    });
                } else {
                    return cell;
                }
            });
        });
    }

    const playGame = function () {
        document.querySelectorAll('.play-grid .empty').forEach(cell => {
            cell.addEventListener('click', e => {
                const selectedCell = e.target.dataset.cell;
                players[activePlayer].cells.push(selectedCell);
                // add player icon to gameboard
                gameBoard[selectedCell - 1] = players[activePlayer].icon;
                // updating winnerRows array
                winnerRows = updateWinningRows(winnerRows, selectedCell);
                // check if we have a winner:
                checkForWinner();
                // switch active Player:
                activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
                updateBoard();
            }, {once: true})
        })
    }

    const startNewGame = function() {
        gameBoard = [];
        winnerRows = [];
        winningRow = null;
        game.createBoard(rowNumber);
        game.updateBoard();
    }

    return {updateBoard, createBoard, startNewGame}
})()


game.startNewGame();







