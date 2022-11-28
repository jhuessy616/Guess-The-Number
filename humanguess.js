let guessedNumber;
let generatedNumber = Math.floor(Math.random() * 100) + 1;

function guesstheNumber(guessedNumber, generatedNumber) {
  // YOUR CODE BELOW

  console.log(generatedNumber);
  if (guessedNumber > generatedNumber) {
    return "Guess Lower";
  } else if (guessedNumber < generatedNumber) {
    return "Guess Higher";
  } else {
    return "Winner Winner Chicken Dinner";
  }
  // YOUR CODE ABOVE
}