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
  addSpaceClickListener();
  changeBoardHeaderNames();
}

// Click event when player attempts to make a move on specific space
function makeMove(event) {
  console.log(turn);
  
  let currentSpace = parseInt(event.currentTarget.firstElementChild.dataset.id);
  let spaceToAddToken = document.querySelector(`[data-id='${currentSpace}']`);
  
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
        <span class="name--style">${playerX.name}</span>, it's your turn!
        <div class="thewinner"></div>
      `
    }  else {
      currentPlayerText.innerHTML = `
        <span class="name--style">${playerY.name}</span>, it's your turn!
        <div class="thewinner"></div>
      `
    }
  }
}

function isWinner() {
  const winningSequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  winningSequences.forEach( winningCombos => {
    let space1 = winningCombos[0];
    let space2 = winningCombos[1];
    let space3 = winningCombos[2];
    if (
      gameBoard[space1] === currentPlayer() &&
      gameBoard[space2] === currentPlayer() &&
      gameBoard[space3] === currentPlayer()
    ) {

      
      const spaces = document.querySelectorAll('.board__space');
      let letterId1 = document.querySelector(`[data-id='${space1}']`);
      let letterId2 = document.querySelector(`[data-id='${space2}']`);
      let letterId3 = document.querySelector(`[data-id='${space3}']`);
      
      spaces.forEach( space => {
        let spaceId = space.firstElementChild.dataset.id;	

        if (spaceId == space1 || spaceId == space2 || spaceId == space3 ) {
          space.classList.add('board__space--winner');
        }
      });

      let currentPlayerText = document.querySelector('.board___player-turn');
      if (currentPlayer() === 'X') {
        currentPlayerText.innerHTML = `
          <div class="congratulations">Congratulations ${playerX.name}</div>
          <div class="thewinner">You are our winner!</div>
        `;
        winner = true;
        removeSpaceClickListener();
        return true;
      } else {
        currentPlayerText.innerHTML = `
          <div class="congratulations">Congratulations ${playerY.name}</div>
          <div class="thewinner">You are our winner!</div>
        `;
        winner = true;
        removeSpaceClickListener();
        return true;
      }
    }
  });

  if (!winner) {
    checkIfTie();
  }
  
  return false;
}