// file that only includes functions that manipulate DOM elements

// -- funcs that display or remove DOM nodes.
const domDisplayBtns = (...args) => {
  args.forEach((btn) => btn.classList.remove("display-none"));
};

const domRemoveBtns = (...args) => {
  args.forEach((btn) => {
    btn.classList.add("display-none");
  });
};
// --

//first card in dealer BlackJ dealt face down... this flips it.
const domRevealDealerCard = () => {
  const dealer = game.dealer;
  // selects first card in dealerCard array, then flips
  const revealCard = dealer.domCardSection.firstElementChild;
  const cardContainer = revealCard.firstElementChild;

  domFlipCard(cardContainer);
};

// -- async because DOM elements take some time.
const domSetHTMLScore = async (player) =>
  await setTimeout(
    () => (player.domScoreSection.innerHTML = `~${player.tally}`),
    0
  );

async function domFlipCard(domCardContainer) {
  await setTimeout(
    () => (domCardContainer.style.transform = "rotateY(180deg)"),
    0
  );
}
//--

const domCreateCard = (card) => {
  //MAKES EXCEPTION FOR AD (ACE OF DIAMONDS) BECAUSE IMAGE GETTING BLOCKED BY ADBLOCKER
  if (card === "AD") card = "aceofdiamonds";

  const newCard = document.createElement("div");
  newCard.classList.add("card");

  // required HTML for Card
  newCard.innerHTML = `
    <div class="card-container">
         <div class="card-back">
          <img src="images/green_back.png">
      </div>
      <div class="card-front">
        <img src="/images/${card}.png">
      </div>
    </div>`;

  return newCard;
};

async function cardToDOM(card, player) {
  //CREATES CARD ELEMENT
  const domNewCard = domCreateCard(card);

  // first elementChild selects the card container within newCard element, this is the element that animation gets applied too.
  const domCardContainer = domNewCard.firstElementChild;

  // First dealt dealer card stays unflipped.
  if (player.name === "dealer" && game.dealer.hand.length === 0) {
    player.domCardSection.appendChild(domNewCard);
  } else {
    player.domCardSection.appendChild(domNewCard);
    await domFlipCard(domCardContainer);
  }
}

// -----WIN EVENT STYLING------ //

domShowOutcome = (winStr) => {
  domCreateOutcomeText(winStr);
  domShowPlayAgain();
};

domCreateOutcomeText = (winStr) => {
  const outcomeText = document.createElement("h1");
  DOM.winSection.appendChild(outcomeText);
  outcomeText.classList.add("youwin");
  outcomeText.innerText = winStr.toUpperCase();
};

domShowPlayAgain = () => {
  DOM.winSection.appendChild(DOM.resetButton);
  DOM.resetButton.classList.remove("display-none");
};
