function Deck(
  hitButton,
  playButton,
  stayButton,
  playerScore,
  dealerScore,
  playerSection,
  dealerSection,
  youWin,
  cardContainers,
  callbacks
) {
  (this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "K", "A", "A"]),
    (this.suits = ["C", "S", "H", "D"]),
    (this.deck = []),
    (this.drawnCards = []);
  this.playerHand = [];
  this.dealerHand = [];

  //buttons
  this.hitButton = hitButton;
  this.playButton = playButton;
  this.stayButton = stayButton;
  //scores
  this.playerScore = playerScore;
  this.dealerScore = dealerScore;

  //section divs
  this.playerSection = playerSection;
  this.dealerSection = dealerSection;
  this.winSection = winSection;

  //cards
  this.cardContainers = cardContainers;

  //function that makes deck and shuffles auto
  if (callbacks) {
    this.onStart = callbacks.onStart;
  }

  this.start = () => {
    // Make + shuffle deck
    this.onStart();
    //draw player + dealer cards and counts
    this.drawMultiple(2, "player");
    this.countHand(this.playerHand, "player");
    this.drawMultiple(2);
    this.countHand(this.dealerHand, "dealer");
  };

  this.hit = () => {
    this.drawCard("player");
    this.countHand(this.playerHand, "player");
  };

  this.stay = () => {
    let dealerTally = this.countHand(this.dealerHand, "dealer");
    while (dealerTally < 17) {
      console.log(dealerTally);
      this.drawCard();
      dealerTally += this.countHand(this.dealerHand, "dealer");
      console.log(dealerTally);
      if (typeof dealerTally === "string") {
        break;
      }
    }
    //call compareHand func
    this.compareHand(this.playerTally, this.dealerTally);
  };

  this.makeDeck = () => {
    const { deck, values, suits } = this;
    for (let value of values) {
      for (let suit of suits) {
        this.deck.push(value + suit);
      }
    }
    return deck;
  };

  this.shuffleDeck = () => {
    this.deck = this.deck.sort((a, b) => 0.5 - Math.random());
    return this.deck;
  };

  this.drawCard = (player) => {
    const card = this.deck.pop();
    this.drawnCards.push(card);
    if (player === "player") {
      dealCard(card, player);
      this.playerHand.push(card);
    } else {
      dealCard(card, "dealer");
      this.dealerHand.push(card);
    }
    return card;
  };

  this.drawMultiple = (numcards, player) => {
    const cards = [];

    for (let i = 0; i < numcards; i++) {
      if (player === "player") {
        cards.push(this.drawCard("player"));
      } else {
        cards.push(this.drawCard("dealer"));
      }
    }
  };

  this.countHand = (hand, player) => {
    let sum = 0;

    for (let card of hand) {
      //check if card is 10
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

    // CHECK FOR 21 OR BUST
    if (sum === 21) {
      result = `${sum} blackjack! ${player} wins`;
      return this.onWin(result, player);
    } else if (sum > 21) {
      result = `${sum}, ${player} busts!`;
      return this.onWin(result, player);
    }

    //PUSHES TO PALYER OR DEALER SIDE
    if (player === "player") {
      this.playerScore.innerHTML = `${sum} ${this.playerHand}`;
    } else {
      this.dealerScore.innerHTML = `${sum} ${this.dealerHand}`;
    }

    return sum;
  };

  //result function that displays you win, or you bust, or dealer wins + hides certain buttons and resets animations

  //deals and creates card element
  dealCard = (card, player) => {
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
    if (this.dealerHand.length === 0 && player === "dealer") {
      this.dealerSection.appendChild(newCard);
    } //ADDS TRANSFORM PROPERTY TO ELEMENT AND SETS A 50MS DELAY SO THE BROWSER LOADS
    else {
      setInterval(setInt, 50);
      function setInt() {
        cardContainer.style.transform = "rotateY(180deg)";
      }
    }

    if (player === "player") {
      this.playerSection.appendChild(newCard);
    } else {
      this.dealerSection.appendChild(newCard);
    }
  };

  this.flipCard = () => {
    console.log(card, cardContainer);
  };

  this.reset = () => {};

  //compareHand func that finds the winner and passes string to onWin func
  this.compareHand = (playerHand, dealerHand) => {
    let playerTally = this.countHand(this.playerHand, "player");
    let dealerTally = this.countHand(this.dealerHand, "dealer");

    if (playerTally > dealerTally) {
      this.onWin("player wins");
    } else if (dealerTally > playerTally) {
      this.onWin(`dealer wins`);
    } else if (playerTally === dealerTally) {
      this.onWin(`push`);
    }
  };

  //func that gets called on win, receives string. Hides buttons and shows message

  this.onWin = (str, player) => {
    const youWinText = document.createElement("h1");
    youWinText.classList.add("youwin");
    youWinText.innerText = str.toUpperCase();
    this.winSection.appendChild(youWinText);

    [hitButton, playButton, stayButton].forEach((btn) => {
      btn.classList.add("display-none");
    });
  };

  //EVENT LISTENERS
  this.hitButton.addEventListener("click", this.hit);
  this.playButton.addEventListener("click", this.start);
  this.stayButton.addEventListener("click", this.stay);
}
