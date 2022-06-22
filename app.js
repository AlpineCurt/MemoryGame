const gameContainer = document.getElementById("game");
const scoreContainer = document.getElementById("score");
let score = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.setAttribute('data-flipped', 'false');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let firstCard = '';
let secondCard = '';

// TODO: Implement this function!
function handleCardClick(e) {
  // Do nothing if an already exposed card is clicked again
  if (e.target.getAttribute('data-flipped') === 'true') {
    return;
  }
  // Do nothing if two unmatched cards are exposed and the setTimeout is still running
  if (firstCard !== '' && secondCard !== '') {
    return;
  }

  if (firstCard === '') {
    firstCard = e.target;
    firstCard.setAttribute('data-flipped', 'true');
    e.target.style.backgroundColor = e.target.className;
    return;
  }

  secondCard = e.target;
  secondCard.setAttribute('data-flipped', 'true');
  e.target.style.backgroundColor = e.target.className;

  // Check for match
  if(firstCard.className !== secondCard.className) {
    setTimeout(function(){
      firstCard.setAttribute('data-flipped', 'false');
      secondCard.setAttribute('data-flipped', 'false');
      firstCard.style.backgroundColor = 'darkslategray';
      secondCard.style.backgroundColor = 'darkslategray';
      resetAfterMatchCheck();
    }, 1500);
  } else {
    resetAfterMatchCheck();
  }
}

function resetAfterMatchCheck() {
  firstCard = '';
  secondCard = '';
  score++;
  scoreContainer.innerText = 'Score: ' + score;
}

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', function(e) {
  startButton.innerText = 'Restart Game';
  let shuffledColors = shuffle(COLORS);
  gameContainer.innerHTML = '';
  createDivsForColors(shuffledColors);
  score = 0;
  scoreContainer.innerText = 'Score: 0';
})