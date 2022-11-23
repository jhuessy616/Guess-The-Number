 // !attempting to force number within these parameters
  // if (secretNumber < 1 || secretNumber > 100)
  // {
  //   console.log("Please enter a number between 0 and 100.");
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
