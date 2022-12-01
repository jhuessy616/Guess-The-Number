// !attempting to force number within these parameters
// if (secretNumber < 1 || secretNumber > 100)
// {
// console.log("Please enter a number between 0 and 100.");
// }
// else {

    start();

async function start() {
console.log(
"Let's play a game where you (human) make up a number and I (computer) try to guess it."
);
let continueGame = true;
let guessMax = 100
let guessMin = 1
let secretNumber = await ask(
"What is your secret number?\nI won't peek, I promise...\n"
);
console.log("You entered: " + secretNumber);
while (continueGame) {
let computerGuessedNumber = 35;
let humanResponse = await ask(`Is your number ${computerGuessedNumber}?`);

    if (humanResponse.toUpperCase() == "Y") {
      if (computerGuessedNumber === secretNumber) {
        console.log("Great I won");
        continueGame = false;
      } else {
        console.log("Are you sure?");
      }
    }

    if (humanResponse == "Q") {
      continueGame = false;
    }

    if (humanResponse == "N") {
      let highOrLow = await ask(`Is the secret number higher or lower?`);

      if (highOrLow == "H") {
        console.log("Ok I will guess higher");
      } else {
        console.log("Ok I will guess lower");
      }
    }

}
// Now try and complete the program.
process.exit();
}

What if I want to quit from anywhere?

Don't want to go back to start of loop after liar liar just ask if higher or lower


counting error lying guesses as well how to not count repeats

   function randomNumber(guessedNumber, generatedNumber) {
  // YOUR CODE BELOW
  console.log(generatedNumber);
  if (guessedNumber > generatedNumber) {
    return "Guess Lower";
  } else if (guessedNumber < generatedNumber) {
    return "Guess Higher";
  } else {
    return "Winner Winner Chicken Dinner";
  }
<!-- to fix, saying it got the answer with a certain amount of tries even if didnt win. must move text into winner if 
 --> Done 

 <!-- have quit bring you to resart option if you want to change the version
  -->
Done 

 <!-- don't want a letter entered for maxvalue -->
 Done 

 

 <!-- let guessMax = parseInt(
        await ask("What would you like the max value to be? (1 to what)?"), 10
      );
    console.log(typeof guessMax);
   
    // let guessMaxNotNum = true

    // ! This is where it's fucked! trying to make it so you can't enter k. 
    while (!(typeof guessMax) == Number)
{
console.log("That is not a number please pick a number");
guessMax = parseInt(
await ask("What would you like the max value to be? (1 to what)?"), 10
);
} -->