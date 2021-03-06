// This file represents all BlackJack related functions. Counting cards, keeping score, etc.

function shuffle(decks) {
  let currentIndex = decks.length,
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

//accepts multiple decks as argument
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

// Game instance creator
class Game {
  constructor() {
    this.decks = makeDecks();
    this.drawnCards = [];
    this.player = {
      hand: [],
      domCardSection: DOM.playerSection,
      domScoreSection: DOM.playerScore,
      tally: null,
      id: 2,
      name: "player",
    };
    this.dealer = {
      hand: [],
      domCardSection: DOM.dealerSection,
      domScoreSection: DOM.dealerScore,
      tally: null,
      id: 1,
      name: "dealer",
    };
  }
}

// create instance of game w/desired numOfDecks
let game;
const createGame = (numOfDecks = 1) => {
  game = new Game(numOfDecks);
};

// draws X number of cards for dealer + player to begin
function drawMultiple(numCards, player) {
  for (let i = 0; i < numCards; i++) {
    drawCard(player);
  }
  countHand(player);
  checkBlackJack(player);
}

function drawCard(player) {
  const card = game.decks.pop();
  game.drawnCards.push(card);
  // arg1: card drawn. arg2: the person drawing the card
  cardToDOM(card, player);
  player.hand.push(card);
}

//Gets called when cards are dealt, player hits, or dealer is dealing own hand.
function countHand(player) {
  let sum = 0;
  for (let card of player.hand) {
    // card = 10A, 9D, 3S, etc. Following blocks slice the integer from the suit

    // exception for two digit integer
    if (card.length === 3) card = "10";
    else {
      card = card[0];
    }

    //Face card check
    if (card === "A") {
      sum += 11;
    } else if (card === "J" || card === "K" || card === "Q") {
      sum += 10;
    }

    //if the card is a true number...
    if (!isNaN(card)) {
      sum += parseInt(card);
    }
  }

  //loop that checks if A === 11 || A === 1 to maintain desirable score
  player.tally = countAces(sum, player);

  // If player hitting calld this func -- push player score to DOM.
  if (player.name === "player") {
    domSetHTMLScore(player);
  }

  checkBlackJack(player);

  return sum;
}

// Aces can be 11 or 1 depending if the hand is below 21
function countAces(sum, player) {
  for (let card of player.hand) {
    if (card[0] === "A" && sum > 21) {
      sum -= 10;
    }
  }
  return sum;
}

function checkBlackJack(player) {
  // show + count bust
  if (player.tally > 21) {
    result = `${player.tally}, ${player.name} busts!`;
    return onWin(result, player);
  }

  // if dealer is playing hand, and either player has 21, reveal 21.
  if (
    player.name === "dealer" &&
    (game.dealer.tally === 21 || game.player.tally === 21)
  ) {
    domRemoveBtns(hitButton, stayButton);

    domRevealDealerCard(game.dealer);
    domSetHTMLScore(game.dealer);
  }
}

//compareHand func that finds the winner and passes string to onWin func
async function compareHand({ player, dealer }) {
  if (player.tally > dealer.tally) {
    onWin(`${player.tally}, player wins`);
  } else if (dealer.tally > player.tally) {
    onWin(`${dealer.tally} dealer wins`);
  } else if (player.tally === dealer.tally) {
    onWin(`push`);
  }
}

async function onWin(winStr) {
  // makes sure winner isn't declar
  if (winSection.children.length > 1) {
    return;
  }

  await setTimeout(DOM.btnContainer.remove());

  domShowOutcome(winStr);
}

// function that handles dealer playing hand
const rollout = (dealerTime = 1500) => {
  //dealerTime is time between dealing dealing each card.
  const { dealer } = game;

  // defines interval ID outside scope.
  let draw;

  draw = setInterval(() => {
    domSetHTMLScore(dealer);

    if (game.dealer.tally >= 17) {
      // dealer does not hit a 17, therefor clearInterval
      clearInterval(draw);
      compareHand(game);
    } else {
      drawCard(dealer);
      countHand(dealer);
    }
  }, dealerTime);
};
