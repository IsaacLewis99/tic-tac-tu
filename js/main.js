"use strict";

window.addEventListener('load', app);

let gameBoard = ['', '', '', '', '', '', '', '', '']; 
let turn = 0; // Keeping track on if it's X or O player's turn
let winner = false;

// Creating a player
const player = (name) => {
  name = name;
  return {name};
 };

 let playerX = player("");
 let playerY = player("");

 // Initialising the app
function app() {
  let inputField = document.querySelector('.input-field').focus();

  const addPlayerForm = document.getElementById('player-form');
  addPlayerForm.addEventListener('submit', addPlayers);

  let replayButton = document.querySelector('.replay-btn');
  replayButton.addEventListener('click', resetBoard);
}

// Adding other players
function addPlayers(event) {
  event.preventDefault();

  if (this.player1.value === '' || this.player2.value === '') {
    alert('Please enter a name for each field');
    return;
  }

  const playerFormContainer = document.querySelector('.enter-players');
  const boardMain = document.querySelector('.board__main');
  playerFormContainer.classList.add('hide-container');
  boardMain.classList.remove('hide-container');

  playerX.name = this.player1.value;
  playerY.name = this.player2.value;
  // Initialise board once players have entered their names
  buildBoard();
}

// Building the Board
function buildBoard() {
  let resetContainer = document.querySelector('.reset');
  resetContainer.classList.remove('reset--hidden');

  onResize();
  addCellClickListener();
  changeBoardHeaderNames();
}

// Click event when player attempts to make a move on specific space
function makeMove(event) {
  console.log(turn);
  
  let currentSpace = parseInt(event.currentTarget.firstElementChild.dataset.id);
  let spaceToAddToken = document.querySelector(`[data-id='${currentCell}']`);
  
  if (spaceToAddToken.innerHTML !== '') {
    console.log('This space is already taken.');
    return;
  } else {
    if (currentPlayer() === 'X') {
      spaceToAddToken.textContent = currentPlayer();
      gameBoard[currentSpace] = 'X';
    } else {
      spaceToAddToken.textContent = currentPlayer();
      gameBoard[currentSpace] = 'O';
    }
  }
    
  // Check if there is a winner at the moment
  isWinner();
    
  // Updating turn count to switch the turn to the other player
  turn ++;

  // Change board header information
  changeBoardHeaderNames();
}

function changeBoardHeaderNames() {
  if (!winner) {
    let currentPlayerText = document.querySelector('.board___player-turn');
    if (currentPlayer() === 'X') {
      currentPlayerText.innerHTML = `
        <span class="name--style">${playerX.name}</span>, you are up!
        <div class="u-r-winner"></div>
      `
    }  else {
      currentPlayerText.innerHTML = `
        <span class="name--style">${playerY.name}</span>, you are up.
        <div class="u-r-winner"></div>
      `
    }
  }
}