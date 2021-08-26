//START FUNCTION
playButton.addEventListener("click", () => {
  drawMultiple(2, "player");
  countHand(playerHand, "player");
  drawMultiple(2);
  countHand(dealerHand, "dealer");
  displayBtns();
});

//HIT FUNCTION
hitButton.addEventListener("click", () => {
  console.log(playerHand);
  drawCard("player");
  countHand(playerHand, "player");
});

//STAY FUNCTIONS
stayButton.addEventListener("click", () => {
  //HIDES HIT AND STAY BUTTON AS DEALER ROLLS OUT
  hitButton.classList.add("display-none");
  stayButton.classList.add("display-none");
  //REVEALS DEALER CARD
  setTimeout(flipCard, 500);
  let dealerTally = countHand(dealerHand, "dealer");

  const draw = setInterval(() => {
    if (dealerTally > 17) {
      clearInterval(draw);
      compareHand(dealerTally);
    } else {
      drawCard();
      dealerTally = countHand(dealerHand, "dealer");
    }
  }, 1500);
});
