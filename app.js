//BUTTONS
const hitButton = document.querySelector("#hitButton");
const playButton = document.querySelector("#playButton");
const resetButton = document.querySelector("#resetButton");
const stayButton = document.querySelector("#stayButton");

//TEXT
const playerScore = document.querySelector("#playerScore");
const dealerScore = document.querySelector("#dealerScore");
const youWin = document.querySelector("#youWin");

//CARDS SECTION
const playerSection = document.querySelector("#player-cards-section");
const dealerSection = document.querySelector("#dealer-cards-section");
const winSection = document.querySelector("#winSection");

//card elements that get added and or styled
const cardContainers = document.querySelectorAll(".card-container");

//contains all elements that need to be cleared on new game
const textArray = [playerScore, playerSection, dealerSection];
const cardTest = document.querySelector(".card-front");

const body = document.querySelector("body");

function removeClass() {
  body.classList.remove("preload");
}

// function myTest() {
//   cardTest.classList.add(".card-container-trans");
//   cardContainer.classList.add(".card-container-trans");
// }

setInterval(removeClass, 2000);
// setInterval(myTest, 4000);

const deck1 = new Deck(
  hitButton,
  playButton,
  stayButton,
  playerScore,
  dealerScore,
  playerSection,
  dealerSection,
  winSection,
  cardContainers,
  {
    onStart() {
      this.makeDeck();
      this.shuffleDeck();
    },
  }
);

resetButton.addEventListener("click", function () {
  location.reload();
  return false;
});
