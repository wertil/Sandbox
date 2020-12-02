const gameBoard = [];

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
const players = [player1, player2];
let activePlayer = 0;


const game = (() => {

    let winnerRows = []

    const playGrid = document.querySelector('.play-grid');

    createWinnerRows = function (rows) {
        let squareNo = 0;
        const diagonalLeftRow = winnerRows[rows + rows + 1] = [];
        const diagonalRightRow = winnerRows[rows + rows + 2] = [];

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
    }

    const checkForWinner = function () {
        winnerRows.forEach(row => {
            const winnerRow = row.every((val, i, arr) => val === arr[0]);
        })
    }

    const updateBoard = function () {
        let html = '';
        let squareNo = 0;
        // check for winner:


        // going through each row of the Game Board
        gameBoard.forEach(cell => {
            // drawing the html for each cell
            squareNo++;
            let markerClass = "";
            if (cell) {
                markerClass = "mark-" + cell;
            }
            html += `<div class="square-${squareNo} ${markerClass}" data-cell="${squareNo}"></div>`;
        })
        playGrid.innerHTML = html;
        playGame();
        console.log({gameBoard});
        console.log(player1, player2);
        console.log({winnerRows});
    }

    const updateWinningRows = function (arr, target) {
        return arr.map(function (rows) {
            return rows.map(function (cell) {
                if (cell.no == target) {
                console.log("huhu", cell.no, target);
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
        document.querySelectorAll('.play-grid div').forEach(cell => {
            cell.addEventListener('click', e => {
                const selectedCell = e.target.dataset.cell;
                players[activePlayer].cells.push(selectedCell);
                // add player icon to gameboard
                gameBoard[selectedCell - 1] = players[activePlayer].icon;
                winnerRows = updateWinningRows(winnerRows, selectedCell);
                // switch active Player:
                activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
                updateBoard();
            })
        })
    }


    return {updateBoard, createBoard}
})()

game.createBoard(3);
game.updateBoard();






