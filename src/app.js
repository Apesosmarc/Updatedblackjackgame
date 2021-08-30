function shuffle(decks) {
  var currentIndex = decks.length,
    randomIndex;
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [decks[currentIndex], decks[randomIndex]] = [
      decks[randomIndex],
      decks[currentIndex],
    ];
  }

  return decks;
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
  return shuffle(decks);
}

class Game {
  constructor() {
    this.decks = makeDecks();
    this.drawnCards = [];
    this.player = {
      hand: [],
      cardSection: playerSection,
      scoreSection: playerScore,
      tally: null,
      id: 2,
      playerName: "player",
    };
    this.dealer = {
      hand: [],
      cardSection: dealerSection,
      scoreSection: dealerScore,
      tally: null,
      id: 1,
      playerName: "dealer",
    };
  }
}

let game;
createGame = (numOfDecks = 1) => {
  game = new Game(numOfDecks);
};

function drawMultiple(numCards, player) {
  for (let i = 0; i < numCards; i++) {
    drawCard(player);
  }
  countHand(player);
}

function drawCard(player) {
  const card = game.decks.pop();
  game.drawnCards.push(card);
  cardToDOM(card, player);
  player.hand.push(card);
}

function tallyHand(player) {
  let sum = 0;
  //checks if card is 10 && slices Card from Suit to count
  for (let card of player.hand) {
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
  for (let card of player.hand) {
    if (card[0] === "A" && sum > 21) {
      sum -= 10;
    }
  }

  player.tally = sum;

  // player Score to DOM
  if (player.id === 2) {
    showplayerScore(player, 500);
  }

  return sum;
}

function checkBlackJack(player) {
  if (player.tally > 21) {
    result = `${player.tally}, ${player.playerName} busts!`;
    return onWin(result, player);
  }

  if (player.id === 1 && (game.player.tally === 21 || player.tally === 21)) {
    removeBtns(hitButton, stayButton);

    setTimeout(flipCard, 1000);
    showplayerScore(player, 500);

    if (player.tally === game.player.tally) {
      result = `PUSH`;
      onWin(result, game.player, 2000);
    }
  }
}

function countHand(player, obj) {
  let sum = tallyHand(player);
  checkBlackJack(player);

  //PUSHES TO PLAYER OR DEALER SIDE BASED ON ARGUMENT INPUT
}

function cardToDOM(card, player) {
  //CREATES CARD ELEMENT
  let newCard = document.createElement("div");
  newCard.classList.add("card");

  //MAKES EXCEPTION FOR AD (ACE OF DIAMONDS) BECAUSE IMAGE GETTING BLOCKED BY ADBLOCKER
  if (card === "AD") card = "aceofdiamonds";

  newCard.innerHTML = `
        <div class="card-container">

             <div class="card-back">
              <img src="images/green_back.png">
          </div>
          <div class="card-front">
            <img src="/images/${card}.png">
          </div>
     
        </div>
        `;

  const cardContainer = newCard.firstElementChild;

  // First dealt dealer card stays unflipped.
  if (player.id === 1 && game.dealer.hand.length === 0) {
    player.cardSection.appendChild(newCard);
  } else {
    setTimeout(() => {
      setFlip(cardContainer);
    }, 0);
  }

  player.cardSection.appendChild(newCard);
}

async function setFlip(card) {
  return (card.style.transform = "rotateY(180deg)");
}

function flipCard() {
  //selects first card in dealer section
  const flipCard = dealerSection.firstElementChild;
  const cardContainer = flipCard.firstElementChild;
  setFlip(cardContainer);
}

//compareHand func that finds the winner and passes string to onWin func
function compareHand({ player, dealer, result }) {
  setTimeout(() => {
    if (player.tally > dealer.tally) {
      onWin(`${player.tally}, player wins`, 500);
    } else if (dealer.tally > player.tally) {
      onWin(`${dealer.tally} dealer wins`, 500);
    } else if (player.tally === dealer.tally) {
      onWin(`push`);
    }
  }, 100);
}

function onWin(str, player, delay) {
  if (winSection.children.length > 1) {
    return;
  }
  let isrunning = false;
  if (!isrunning) {
    isRunning = true;
    setTimeout(() => {
      youWinStyling(str);
    }, delay);
  }
}

youWinStyling = (str) => {
  const youWinText = document.createElement("h1");
  winSection.style.height = "255px";
  winSection.appendChild(youWinText);
  youWinText.classList.add("youwin");
  youWinText.innerText = str.toUpperCase();
  winSection.appendChild(resetButton);
  resetButton.classList.remove("display-none");
  btnContainer.style.height = "0px";
};