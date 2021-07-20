"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const player0Name = document.querySelector(".player0title");
const player1Name = document.querySelector(".player1title");

const scoreDisplay0El = document.querySelector(".score--0");
const scoreDisplay1El = document.querySelector(".score--1");

const newGame = document.querySelector(".newGame");
const rules = document.querySelector(".rulesButton");
const overlayEl = document.querySelector(".overlay");

const roll1 = document.querySelector(".rollChoice1");
const roll2 = document.querySelector(".rollChoice2");
const roll3 = document.querySelector(".rollChoice3");
const roll4 = document.querySelector(".rollChoice4");

const result1 = document.querySelector(".result1");
const result2 = document.querySelector(".result2");
const result3 = document.querySelector(".result3");
const result4 = document.querySelector(".result4");
const winText = document.querySelector(".winText");

const dice1 = document.querySelector("#dice1");
const dice2 = document.querySelector("#dice2");
const dice3 = document.querySelector("#dice3");
const dice4 = document.querySelector("#dice4");

let score;
let playing;
let activePlayer;
let lives;

const reinstateHearts = function () {
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`P0L${i}`).classList.remove("hide");
    document.getElementById(`P1L${i}`).classList.remove("hide");
  }
};

const init = function () {
  playing = true;
  score = [0, 0];
  lives = [5, 5];
  activePlayer = 0;

  winText.classList.add("hide");

  scoreDisplay0El.textContent = score[0];
  scoreDisplay1El.textContent = score[1];

  player0El.classList.remove("player--rolledA1");
  player1El.classList.remove("player--rolledA1");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0Name.classList.add("underline");
  player1Name.classList.remove("underline");

  reinstateHearts();
};

init();

const updateHearts = function () {
  for (let i = 5; i > lives[activePlayer]; i--) {
    document.getElementById(`P${activePlayer}L${i}`).classList.add("hide");
  }

  if (lives[activePlayer] < 1) {
    playing = false;
    result1.classList.add("hide");
    result2.classList.add("hide");
    result3.classList.add("hide");
    result4.classList.add("hide");
    winText.classList.remove("hide");
    if (activePlayer === 1) {
      score[0] += 50;
    } else {
      score[1] += 50;
    }
    scoreDisplay0El.textContent = score[0];
    scoreDisplay1El.textContent = score[1];

    if (score[0] > score[1]) {
      winText.textContent = `Player 1 Wins!`;
    } else {
      winText.textContent = `Player 2 Wins!`;
    }
  }
};

const generateRollResult = function () {
  return Math.trunc(Math.random() * 6 + 1);
};

const changePlayer = function () {
  activePlayer = activePlayer === 1 ? 0 : 1;
  console.log(`Changed Player: ${activePlayer}`);
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  player0Name.classList.toggle("underline");
  player1Name.classList.toggle("underline");
};

const rollDice = function (numberOfRolls) {
  result1.classList.add("hide");
  result2.classList.add("hide");
  result3.classList.add("hide");
  result4.classList.add("hide");

  player0El.classList.remove("player--rolledA1");
  player1El.classList.remove("player--rolledA1");

  let rollResults = [];
  let rollTotal = 0;

  for (let i = 0; i < numberOfRolls; i++) {
    rollResults[i] = generateRollResult();
    let x = i + 1;
    switch (x) {
      case 1:
        dice1.src = `dice-${rollResults[i]}.png`;
        result1.classList.remove("hide");
        continue;
      case 2:
        dice2.src = `dice-${rollResults[i]}.png`;
        result2.classList.remove("hide");
        continue;
      case 3:
        dice3.src = `dice-${rollResults[i]}.png`;
        result3.classList.remove("hide");
        continue;
      case 4:
        dice4.src = `dice-${rollResults[i]}.png`;
        result4.classList.remove("hide");
        continue;
    }
  }

  for (let i = 0; i < numberOfRolls; i++) {
    if (rollResults[i] === 1) {
      rollResults = [];
      console.log("ROLLED A 1");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--rolledA1");
      rollTotal = 0;
      document;
      lives[activePlayer]--;
      updateHearts();
      break;
    } else if (rollResults[i] > 1) {
      rollTotal += rollResults[i];
    }
  }

  score[activePlayer] += rollTotal;
  document.querySelector(`.score--${activePlayer}`).textContent =
    score[activePlayer];
  changePlayer();
};

roll1.addEventListener("click", function () {
  if (playing) {
    rollDice(1);
  }
});
roll2.addEventListener("click", function () {
  if (playing) {
    rollDice(2);
  }
});
roll3.addEventListener("click", function () {
  if (playing) {
    rollDice(3);
  }
});
roll4.addEventListener("click", function () {
  if (playing) {
    rollDice(4);
  }
});
newGame.addEventListener("click", function () {
  init();
});
overlayEl.addEventListener("click", function () {
  overlayEl.classList.add("hide");
});
rules.addEventListener("click", function () {
  overlayEl.classList.remove("hide");
});
