const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = 0;

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.remove('hidden');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  matchedCards += 2;
  resetBoard();

  if (matchedCards === cards.length) {
    setTimeout(() => {
      cards.forEach(card => {
        card.classList.remove('matched');
        card.classList.add('hidden'); // Add the 'hidden' class to hide the cards
        card.addEventListener('click', flipCard); // Enable click event on all cards
      });
      shuffleCards(); // Shuffle the cards for the next game
      resetBoard();
    }, 1000);
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.add('hidden');
    secondCard.classList.add('hidden');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

function displayMessage(message) {
  const messageContainer = document.querySelector('.message');
  messageContainer.textContent = message;
}

shuffleCards(); // Shuffle the cards initially

cards.forEach(card => card.addEventListener('click', flipCard));
