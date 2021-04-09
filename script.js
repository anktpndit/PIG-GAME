'use strict';

//state variables
let score = [0, 0]
let activePlayer = 0;
let current = 0;
let playingState = true;

//storing DOM elements in a variable for easy access
const rollDice = document.querySelector('.btn--roll');
const diceImage = document.querySelector('.dice');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const hold = document.querySelector('.btn--hold');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const newGame = document.querySelector('.btn--new');

//function to change the active player
const playerChange = function () {
    current = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = (activePlayer) ? 0 : 1;

    //since the player got 1, we have to change current value to 0

    //let us toggle both players such that one is active and one is not
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

rollDice.addEventListener('click', function () {
    //for generating random number for our dice
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    diceImage.src = `dice-${randomNumber}.png`;

    //if our dice is not one, then we add to the current score
    if (randomNumber !== 1) {
        current = current + randomNumber;
        document.getElementById(`current--${activePlayer}`).textContent = current;
    } else {
        playerChange();
    }
});

hold.addEventListener('click', function () {
    score[activePlayer] += current;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
    //following code checks if someone won the game or not
    if (score[activePlayer] >= 100) {
        playingState = false;
        document.getElementById(`name--${activePlayer}`).textContent = `Player ${activePlayer+1} wins!`
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        rollDice.style.display = "none";
        hold.style.display = "none";
    } else {
        playerChange();
    }
});

newGame.addEventListener('click', function () {
    score = [0, 0]
    current = 0;

    //updating the values in our page as well
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;

    //following code removes the state which were updated when someone won the game
    if (!playingState) {
        rollDice.style.display = "unset";
        hold.style.display = "unset";
        document.getElementById(`name--${activePlayer}`).textContent = `Player ${activePlayer+1}`
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
        playingState = true;
    }
    //we toggle the active player class if the active player was player 2
    if (activePlayer) {
        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');
        activePlayer = 0;
    }
});