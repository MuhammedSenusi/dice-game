'use strict';

const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

const init = () => {
  // initial values

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score1El.textContent = 0;
  score2El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// roll dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomDice}.png`;

    if (randomDice !== 1) {
      currentScore += randomDice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }

  //   console.log(randomDice);
});

// hold current score
btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
  //switchplayer
});

// Reset game

btnNew.addEventListener('click', () => {
  init();
});
