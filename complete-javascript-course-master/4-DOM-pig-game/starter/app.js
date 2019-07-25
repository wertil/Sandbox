/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying, lastDice, roundCount, winningScore;


init();

winningScore = 100;
document.querySelector(".winning-score").value = winningScore;
// Change Winning Score:
document.querySelector('.form button').addEventListener('click', function () {
        winningScore = document.querySelector(".winning-score").value;
});

document.querySelector('.btn-roll').addEventListener('click', function () {
        if (gamePlaying) {
                // Random Number
                var dice = Math.floor(Math.random() * 6) + 1;
                var dice2 = Math.floor(Math.random() * 6) + 1;
                // Display Result
                var diceDOM = document.querySelector('.dice-1');
                var diceDOM2 = document.querySelector('.dice-2');
                diceDOM.style.display = 'block';
                diceDOM2.style.display = 'block';
                diceDOM.src = 'dice-' + dice + '.png';
                diceDOM2.src = 'dice-' + dice2 + '.png';
                roundCount++;

                // Update Score (if number as not 1)
                if (dice !== 1 && dice2 != 1) { 


                        if (roundCount >= 2 && lastDice === 6 && dice === 6) {
                                scores[activePlayer] = 0;
                                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                                nextPlayer();
                        } else {
                                roundScore += dice + dice2;
                                lastDice = dice;
                                document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
                        }



                } else {
                        // next player
                        nextPlayer();

                }
        }

})

function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        roundCount = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice-2').style.display = 'none';
        document.querySelector('.dice-1').style.display = 'none';
}

document.querySelector('.btn-hold').addEventListener('click', function () {

        if (gamePlaying) {
                // add current score to global score
                scores[activePlayer] += roundScore;

                // update UI
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

                // check if player won the game
                if (scores[activePlayer] >= winningScore) {
                        document.getElementById(`name-${activePlayer}`).textContent = 'WINNER';
                        document.querySelector('.dice').style.display = 'none';
                        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
                        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
                        gamePlaying = false;
                } else {
                        nextPlayer();
                }

        }

})

document.querySelector('.btn-new').addEventListener('click', init)


function init() {

        scores = [0, 0];
        roundScore = 0;
        activePlayer = 0;
        gamePlaying = true;

        document.querySelector(`.player-0-panel`).classList.remove('winner');
        document.querySelector(`.player-1-panel`).classList.remove('winner');
        document.querySelector(`.player-0-panel`).classList.remove('active');
        document.querySelector(`.player-1-panel`).classList.remove('active');
        document.querySelector(`.player-0-panel`).classList.add('active');


        document.querySelector('.dice-1').style.display = 'none';
        document.querySelector('.dice-2').style.display = 'none';

        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';



}



// document.querySelector(`#current-${activePlayer}`).textContent = dice;

