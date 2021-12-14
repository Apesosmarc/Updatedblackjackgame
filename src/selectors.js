// creates new OBJ called DOM to better define DOM elements versus app properties.

const DOM = {
  //BUTTONS
  hitButton: document.querySelector("#hitButton"),
  playButton: document.querySelector("#playButton"),
  resetButton: document.querySelector("#resetButton"),
  stayButton: document.querySelector("#stayButton"),

  // Buttons Container
  btnContainer: document.querySelector(".button-container"),

  //TEXT
  playerScore: document.querySelector("#playerScore"),
  dealerScore: document.querySelector("#dealerScore"),
  youWin: document.querySelector("#youWin"),
  gameHeader: document.querySelector(".game-header"),

  //CARDS SECTION
  playerSection: document.querySelector("#player-cards-section"),
  dealerSection: document.querySelector("#dealer-cards-section"),
  winSection: document.querySelector("#winSection"),

  //card elements that get added and or styled
  cardContainers: document.querySelectorAll(".card-container"),

  body: document.querySelector("body"),
};
