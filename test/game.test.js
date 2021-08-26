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



unction drawMultiple(numCards, player) {
  const cards = [];
  for (let i = 0; i < numCards; i++) {
    if (player === "player") {
      drawCard("player");
    } else {
      drawCard("dealer");
    }
  }

  //  cards.push(drawCard(hand))
}

function drawCard(player) {
  const card = decks.pop();
  drawnCards.push(card);
  if (player === "player") {
    //should be the same func
    dealCard(card, player);
    playerHand.push(card);
  } else {
    dealCard(card, "dealer");
    dealerHand.push(card);
  }
  return card;
}

function cardToDOM(card, player) {
  //CREATES CARD ELEMENT
  // let newCard = document.createElement("div");
  // newCard.classList.add("card");

  // //MAKES EXCEPTION FOR AD (ACE OF DIAMONDS) BECAUSE IMAGE GETTING BLOCKED BY ADBLOCKER
  // if (card === "AD") card = "aceofdiamonds";

  // newCard.innerHTML = `
  //       <div class="card-container">
  //         <div class="card-front">
  //           <img src="/images/${card}.png">
  //         </div>

  //         <div class="card-back">
  //             <img src="images/green_back.png">
  //         </div>
  //       </div>
  //       `;

  // const cardContainer = newCard.firstElementChild;

  //   //CHECKS IF CARD IS FIRST CARD DEALT TO DEALER ((FACEDOWN))
  if (player.id === 1 && game.dealer.hand.length === 0) {
    console.log("------------------- called held");
  }
  //   //ADDS TRANSFORM PROPERTY TO CARD AND SETS A 50MS DELAY SO ANIMATION IS VISIBLE
  //   else {
  //     function setFlip() {
  //       cardContainer.style.transform = "rotateY(180deg)";
  //     }
  //     //only way to get CSS transitions to start was to call via setTimeout
  //     setTimeout(setFlip, 0);
  //     console.log("dealer card flipped");
  //   }

  player.section.push(`${card} added`);
}

let game = {
  decks: makeDecks(),
  drawnCards: [],
  player: {
    hand: [],
    section: [],
    tally: null,
    id: 2,
  },
  dealer: {
    hand: [],
    section: [],
    tally: null,
    id: 1,
  },
};


// display buttons func

//HIT FUNCTION
hitButton.addEventListener("click", () => {
  drawCard(player);
  countHand(player);
});
