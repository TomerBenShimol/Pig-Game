"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Whose turn it is
const isActive = function (player) {
  return player.classList.contains("player--active");
};

// Switching between the players
const switchTurns = function (active) {
  if (active === player1El) {
    player1El.classList.remove("player--active");
    player0El.classList.add("player--active");
  } else {
    player0El.classList.remove("player--active");
    player1El.classList.add("player--active");
  }
};

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

// Scores
let totalScore0 = 0;
let totalScore1 = 0;
let score0 = 0;
let score1 = 0;

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  // 1. Generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;
  // 2. Display the dice
  diceEl.classList.remove("hidden");
  // 3. Check for rolled 1: if true, switch to next player
  if (dice === 1) {
    if (isActive(player0El)) {
      switchTurns(player0El);
      score0 = 0;
      current0El.textContent = 0;
    } else {
      switchTurns(player1El);
      score1 = 0;
      current1El.textContent = 0;
    }
  }
  // If rolled != 1, update current score
  else {
    if (isActive(player0El)) {
      score0 += dice;
      current0El.textContent = score0;
    } else {
      score1 += dice;
      current1El.textContent = score1;
    }
  }
});

// Hold button functionality
btnHold.addEventListener("click", function () {
  if (isActive(player0El)) {
    // If there is a score to add
    if (score0 !== 0) {
      totalScore0 += score0;
      score0El.textContent = totalScore0;
      score0 = 0;
      current0El.textContent = 0;
    }
  } else {
    if (score1 !== 0) {
      totalScore1 += score1;
      score1El.textContent = totalScore1;
      score1 = 0;
      current1El.textContent = 0;
    }
  }
});

// New game functionality
btnNew.addEventListener("click", function () {
  if (isActive(player1El)) {
    switchTurns(player1El);
  }
  diceEl.classList.add("hidden");
  score0 = 0;
  totalScore0 = 0;
  current0El.textContent = 0;
  score0El.textContent = 0;
  score1 = 0;
  totalScore1 = 0;
  current1El.textContent = 0;
  score1El.textContent = 0;
});
