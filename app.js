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

function makeDecks(numDecks = 1) {
  const decks = [];
  const suits = ["C", "S", "H", "D"];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

  for (i = 0; i < numDecks; i++) {
    for (let value of values) {
      for (let suit of suits) {
        decks.push(value + suit);
      }
    }
  }
  return decks.sort((a, b) => 0.5 - Math.random());
}

const decks = makeDecks();

let drawnCards = [],
  playerHand = [],
  dealerHand = [];

function drawMultiple(numCards, player) {
  const cards = [];
  for (let i = 0; i < numCards; i++) {
    if (player === "player") {
      cards.push(drawCard("player"));
    } else {
      cards.push(drawCard("dealer"));
    }
  }
}

function drawCard(player) {
  const card = decks.pop();
  drawnCards.push(card);
  if (player === "player") {
    this.dealCard(card, player);
    playerHand.push(card);
  } else {
    this.dealCard(card, "dealer");
    dealerHand.push(card);
  }
  return card;
}

function countHand(hand, player) {
  let sum = 0;
  //checks if card is 10 && slices Card from Suit to count
  for (let card of hand) {
    if (card.length === 3) card = "10";
    else {
      card = card[0];
    }
    //Face card checks
    if (card === "A") {
      sum += 11;
    } else if (card === "J" || card === "K" || card === "Q") {
      sum += 10;
    }
    //digit card check
    if (card === "10") {
      sum += 10;
    } else if (!isNaN(card)) {
      sum += parseInt(card);
    }
  }
  //loop that checks if A === 11 || A === 1 to maintain desirable score
  for (let card of hand) {
    if (card[0] === "A" && sum > 21) {
      sum -= 10;
    }
  }
  // CHECK FOR IMMEDIATE 21 OR BUST
  if (sum > 21) {
    result = `${sum}, ${player} busts!`;
    this.onWin(result, player);
  }
  //PUSHES TO PLAYER OR DEALER SIDE BASED ON ARGUMENT INPUT
  setTimeout(() => {
    if (player === "player") {
      playerScore.innerHTML = `${sum} ${playerHand}`;
    } else {
      dealerScore.innerHTML = `${sum} ${dealerHand}`;
    }
  }, 100);
  return parseInt(sum);
}

function hit() {
  this.drawCard("player");
  this.countHand(this.playerHand, "player");
}

function displayBtns() {
  this.stayButton.classList.remove("display-none");
  this.hitButton.classList.remove("display-none");
  this.playButton.classList.add("display-none");
}

function stay() {}

function dealCard(card, player) {
  //CREATES CARD
  let newCard = document.createElement("div");
  newCard.classList.add("card");

  //MAKES EXCEPTION FOR AD (ACE OF DIAMONDS) BECAUSE IMAGE GETTING BLOCKED BY ADBLOCKER
  if (card === "AD") card = "aceofdiamonds";

  //ADDS INNERHTML TO CARD
  newCard.innerHTML = `
<div class="card-container">
<div class="card-front">
  <img src="/images/${card}.png">
</div>

<div class="card-back">
    <img src="images/green_back.png"> 
</div>
</div>`;

  const cardContainer = newCard.firstElementChild;
  //CHECKS FOR FACEDOWN CARD
  if (dealerHand.length === 0 && player === "dealer") {
    dealerSection.appendChild(newCard);
  } //ADDS TRANSFORM PROPERTY TO ELEMENT AND SETS A 50MS DELAY SO THE BROWSER LOADS
  else {
    function setFlip() {
      cardContainer.style.transform = "rotateY(180deg)";
    }
    //only way to get CSS transitions to start was to call via setTimeout
    setTimeout(setFlip, 0);
  }

  if (player === "player") {
    playerSection.appendChild(newCard);
  } else {
    dealerSection.appendChild(newCard);
  }

  return card;
}

function flipCard() {
  //selects first card in dealer section
  const flipCard = dealerSection.firstElementChild;
  const cardContainer = flipCard.firstElementChild;
  function setFlip() {
    cardContainer.style.transform = "rotateY(180deg)";
  }
  setTimeout(setFlip, 50);
}

//compareHand func that finds the winner and passes string to onWin func
function compareHand() {
  let playerTally = this.countHand(playerHand, "player");
  let dealerTally = this.countHand(dealerHand, "dealer");
  console.log(dealerTally, playerTally);

  let run = false;
  if (!run) {
    if (playerTally > dealerTally) {
      run = true;
      return this.onWin(`${playerTally}, player wins`);
    } else if (dealerTally > playerTally) {
      run = true;
      return this.onWin(`${dealerTally} dealer wins`);
    } else if (playerTally === dealerTally) {
      run = true;
      return this.onWin(`push`);
    }
  }
}

function onWin(str, player) {
  //ADD A CONDITION THAT CHECKS IF WINSECTION IS POPULATED OR NOT.
  [hitButton, playButton, stayButton].forEach((btn) => {
    btn.classList.add("display-none");
  });
  setTimeout(() => {
    let winCount = [...document.querySelectorAll(".youwin")];
    if (winCount.length < 1) {
      const youWinText = document.createElement("h1");
      youWinText.classList.add("youwin");
      youWinText.innerText = str.toUpperCase();
      this.winSection.appendChild(youWinText);
    }
  }, 50);
}

//START FUNCTION
playButton.addEventListener(
  "click",
  (start = () => {
    this.drawMultiple(2, "player");
    this.countHand(playerHand, "player");
    this.drawMultiple(2);
    this.countHand(dealerHand, "dealer");
    this.displayBtns();
  })
);

//HIT FUNCTION
hitButton.addEventListener(
  "click",
  (hit = () => {
    console.log(playerHand);
    this.drawCard("player");
    this.countHand(playerHand, "player");
  })
);

//STAY FUNCTIONS
stayButton.addEventListener(
  "click",
  (stay = () => {
    //HIDES HIT AND STAY BUTTON AS DEALER ROLLS OUT
    hitButton.classList.add("display-none");
    stayButton.classList.add("display-none");
    //REVEALS DEALER CARD
    setTimeout(this.flipCard, 500);
    let dealerTally = this.countHand(dealerHand, "dealer");

    const draw = setInterval(() => {
      if (dealerTally > 17) {
        clearInterval(draw);
        this.compareHand(dealerTally);
      } else {
        this.drawCard();
        dealerTally = this.countHand(dealerHand, "dealer");
      }
    }, 1500);
  })
);

resetButton.addEventListener("click", function () {
  location.reload();
  return false;
});
