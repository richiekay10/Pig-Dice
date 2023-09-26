"use strict";

const rollBtn = document.querySelector(".roll");
const diceImg = document.querySelector(".dice-img");
const playerZero = document.querySelector(".current-player-0");
const playerOne = document.querySelector(".current-player-1");
const pl1 = document.querySelector(".curr--0");
const pl2 = document.querySelector(".curr--1");
const holdBtn = document.querySelector(".hold-btn");
const holdNumb0 = document.querySelector(".hold-numb-0");
const holdNumb1 = document.querySelector(".hold-numb-1");
const newGameBtn = document.querySelector(".new-game-button");
const aboutBtn = document.querySelector(".about-button");
const aboutGameInfo = document.querySelector(".about-game-info");
const closeX = document.querySelector(".x-mark");
const overlay = document.querySelector(".overlay");
const setPlayersContainer = document.querySelector(".set-players"); //Setting players DIV
const setPlayer1 = document.querySelector(".input1"); //Getting Player 1 input
const setPlayer2 = document.querySelector(".input2"); //Getting Player 2 input
const winningValue = document.querySelector(".winning-value"); //Winning Value input
const startGame = document.querySelector(".start-game"); //Start game button
const player1Text = document.querySelector(".player1-text"); //Player 1 text
const player2Text = document.querySelector(".player2-text"); //Player 2 text

//Implementing the Player Winner Text
const playerText = document.querySelectorAll(".player-text");

let text = [];

let value = 0; //This is the counter to increase for the winning value
let current = 0;
let holdScore = [0, 0];
let activePlayer = 0;
let playing = true;



pl1.classList.add("side");
pl2.classList.remove("side");

const switchPlayer = function () {
  current = 0;
  document.querySelector(`.current-player-${activePlayer}`).innerHTML = current;
  activePlayer = activePlayer === 0 ? 1 : 0;
  pl1.classList.toggle("side");
  pl2.classList.toggle("side");
}

const refresh = function () {
  alert(`Once you REFRESH the game, You lose all points!`);
  pl1.classList.remove("winner");
  pl2.classList.remove("winner");

  diceImg.classList.add("hidden");
  pl1.classList.add("side");
  pl2.classList.remove("side");
  current = 0;
  // We select the current player which is Player 1
  activePlayer = 0;
  document.querySelector(`.current-player-${activePlayer}`);
  playerZero.innerHTML = current;
  playerOne.innerHTML = current;
  //We simply redeclare the holdScore here and set the holdScore innerHTML to 0
  holdScore = [0, 0];
  holdNumb0.innerHTML = holdScore[0];
  holdNumb1.innerHTML = holdScore[1];
  playing = true; 

  //Resetting the Player 1 and Player 2 Winner text to the defaults
  playerText[0].innerHTML = `PLAYER 1`;
  playerText[1].innerHTML = `PLAYER 2`;

  //Resetting the winning value
  value = 0;
  setPlayersContainer.classList.remove("hide-input"); //Removing the hide-input
  
  //Setting all input to empty value
  setPlayer1.value = "";
  setPlayer2.value = "";
  winningValue.value = "";

  //Toggling newGame, roll and hold buttons
  newGameBtn.classList.add("hidden");
  rollBtn.classList.add("hidden");
  holdBtn.classList.add("hidden");

  //Resetting the text array so it doesn't save the prevoius player names
  text = [];
}


const rollDice = function () {
  if (playing) {
    let random = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove("hidden");
    diceImg.setAttribute(`src`, `./images/dice-${random}.png`);

    if (random !== 1) {
      current += random;
      document.querySelector(`.current-player-${activePlayer}`).innerHTML = current;

    } else {
      switchPlayer();
    }
  }

}

const holdButton = function () {
  if (playing) {
    holdScore[activePlayer] += current;
    document.querySelector(`.hold-numb-${activePlayer}`).innerHTML = holdScore[activePlayer];
    if (holdScore[activePlayer] >= value) {
      console.log(value);
      playing = false;
      document.querySelector(`.curr--${activePlayer}`).classList.add("winner");
      document.querySelector(`.curr--${activePlayer}`).classList.remove("side");
      
      if (activePlayer) {
        playerText[activePlayer].innerHTML = `${text[activePlayer]} wins`;
      } else {
        playerText[activePlayer].innerHTML = `${text[activePlayer]} wins`;
      }
    }
    
    switchPlayer();
  }
}

const newGame = function () {
  refresh();

}

const aboutGame = function () {
  aboutGameInfo.classList.toggle("mask");
  overlay.classList.toggle("mask");
}

let closeXMark = function () {
  aboutGameInfo.classList.add("mask");
  overlay.classList.add("mask");
}

const closeModal = function (event) {
  let key = event.key;
  if (key === "Escape") {
    closeXMark();
  }
}

const refreshGame = function (event) {
  let key = event.key;
  if (key === "R") {
    refresh();
  }
  
}

const startGameNow = function () {
  text.push(setPlayer1.value, setPlayer2.value);
  value += Number(winningValue.value);
  player1Text.innerHTML = text[0];
  player2Text.innerHTML = text[1];
  setPlayersContainer.classList.add("hide-input");
  newGameBtn.classList.remove("hidden");
  rollBtn.classList.remove("hidden");
  holdBtn.classList.remove("hidden");
}

const startGameNowKey = function (event) {
  let key = event.key;
  if (key === "Enter") {
    startGameNow();
  }  
}

startGame.addEventListener("keydown", startGameNowKey);
startGame.addEventListener("click", startGameNow);
overlay.addEventListener("click", closeXMark);
document.addEventListener("keydown", refreshGame);
document.addEventListener("keydown", closeModal);
closeX.addEventListener("click", closeXMark);
aboutBtn.addEventListener("click", aboutGame);
newGameBtn.addEventListener("click", newGame);
holdBtn.addEventListener("click", holdButton);
rollBtn.addEventListener("click", rollDice);