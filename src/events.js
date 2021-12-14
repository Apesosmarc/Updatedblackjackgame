// This file defines all event-based interaction from player + dom

const startSequence = () => {
  createGame();
  domRemoveBtns(DOM.resetButton);
  drawMultiple(2, game.player);
  drawMultiple(2, game.dealer);

  setTimeout(() => {
    domDisplayBtns(hitButton, stayButton);
  }, 1000);
};

window.addEventListener("load", startSequence);

hitButton.addEventListener("click", () => {
  drawCard(game.player);
  countHand(game.player);
});

// STAY
stayButton.addEventListener("click", () => {
  domRemoveBtns(hitButton, stayButton);

  domSetHTMLScore(game.dealer);
  domRevealDealerCard();

  // dealer plays rest of hand
  rollout();
});

// PLAY AGAIN
resetButton.addEventListener("click", () => {
  location.reload();
});
