const displayBtns = (...args) => {
  args.forEach((btn) => btn.classList.remove("display-none"));
};

const removeBtns = (...args) => {
  args.forEach((btn) => {
    btn.classList.add("display-none");
  });
};

const showplayerScore = (player, delay) => {
  return setTimeout(() => {
    player.scoreSection.innerHTML = `~${player.tally}`;
  }, delay);
};

//START FUNCTION
playButton.addEventListener("click", () => {
  removeBtns(playButton, resetButton);
  drawMultiple(2, game.player);
  drawMultiple(2, game.dealer);

  setTimeout(() => {
    displayBtns(hitButton, stayButton);
  }, 1000);
});

hitButton.addEventListener("click", () => {
  drawCard(game.player);
  countHand(game.player);
});

const rollout = () => {
  let draw;
  draw = setInterval(() => {
    showplayerScore(game.dealer, 200);
    if (game.dealer.tally >= 17) {
      clearInterval(draw);
      compareHand(game);
    } else {
      drawCard(game.dealer);
      countHand(game.dealer);
    }
  }, 1500);
};

//STAY FUNCTIONS
stayButton.addEventListener("click", () => {
  removeBtns(hitButton, stayButton);
  displayBtns(resetButton);
  showplayerScore(game.dealer, 500);
  //REVEALS DEALER CARD
  setTimeout(flipCard, 0);
  rollout();
});

resetButton.addEventListener("click", function () {
  location.reload();
  return false;
});
