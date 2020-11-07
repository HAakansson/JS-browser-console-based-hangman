const words = [
  "boat",
  "car",
  "airplane",
  "truck",
  "bicycle",
  "scooter",
  "motorcycle",
  "train",
  "freight",
  "ship",
  "cruiser",
];

const secretWord = words[Math.floor(Math.random() * words.length)];
const maxMisses = 3;
let misses = 0;
let attempts = 1;
let publicWord = secretWord.replace(/\D/g, "_");
let wordIsCorrect = false;
let usedLetters = [];

console.log(
  "Welcome to a game of hangman! Invoke the method 'startGame()' in order to start the game."
);

function startGame() {
  setTimeout(function () {
    console.log("Okay, let's go. The secret word has been set!");
    startGuessing();
  }, 1000);
  return "Setting start word...";
}

function startGuessing() {
  printPublicWord();

  while (!wordIsCorrect) {
    if (usedLetters.length > 0) {
      console.log("Used letters: ", usedLetters);
      console.log(`${maxMisses - misses} tries left.`);
    }

    let letter = guessLetter();

    if (doesLetterExists(letter)) {
      console.log("HIT!");
      publicWord = replaceUnderScoresWithLetter(letter);
      if (checkIfTheSecretWordIfComplete()) {
        printPublicWord();
        console.log("CONGRATULATIONS! You have guessed the entire word!");
        console.log(`It took you ${attempts} times to finish!`);
        return;
      }
      printPublicWord();
    } else {
      console.log("MISS!");
      misses++;
      if (misses === maxMisses) {
        console.log("GAME OVER! You have been hanged!");
        return;
      }
    }
    attempts++;
  }
}

/*---- Game methods below ----*/

function guessLetter() {
  let guess;
  let regEx = /[^a-zA-Z]/;
  let guessAgain = true;

  do {
    guess = prompt("Type in your guess...");

    if (checkIfLetterIsAlreadyGuessed(guess)) {
      console.log("That letter has already been guessed.");
    } else if (regEx.test(guess) && guess.length > 1) {
      console.log(
        "ERROR - You are only allowed to enter letters and ONE only."
      );
    } else if (regEx.test(guess)) {
      console.log("ERROR - Only letters are allowed.");
    } else if (guess.length > 1) {
      console.log("ERROR - Only ONE letter is allowed.");
    } else {
      guessAgain = false;
    }
  } while (guessAgain);

  usedLetters.push(guess);
  return guess;
}

function printPublicWord() {
  console.log(publicWord.split("").join(" "));
}

function doesLetterExists(letter) {
  return secretWord.includes(letter);
}

function getIndexesOfLetter(letter) {
  let indexes = [];
  for (let i = 0; i < secretWord.length; i++) {
    if (letter === secretWord[i]) {
      indexes.push(i);
    }
  }
  return indexes;
}

function replaceUnderScoresWithLetter(letter) {
  let indexes = getIndexesOfLetter(letter);
  let publicWordArray = publicWord.split("");
  for (let i of indexes) {
    publicWordArray[i] = letter;
  }
  return publicWordArray.join("");
}

function checkIfTheSecretWordIfComplete() {
  return secretWord === publicWord;
}

function checkIfLetterIsAlreadyGuessed(letter) {
  return usedLetters.includes(letter);
}
