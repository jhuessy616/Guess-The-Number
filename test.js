const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// start();

// async function start() {
//   console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
//   let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
//   console.log('You entered: ' + secretNumber);
//   // Now try and complete the program.
//   process.exit();
// }

start();

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it. You may enter Q at anytime to quit the game."
  );

  let continueGame = true;
  let guessMin = 1;
  // let guessMax = 100;
  let guessMax = await ask(
    "What would you like the max value to be? (1 to what)?"
  );

  console.log(
    "You picked a max value of " +
    guessMax +
    ". The range for this round will be 1-" +
    guessMax +
    "."
  );
  // let guessMax = 100;
  let middle = Math.floor((guessMin + parseInt(guessMax)) / 2);

  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  // ! want to insert if it is beyond min and max

  while (continueGame) {
    let computerGuessedNumber = middle;
    let humanResponse = await ask(
      `Is your number ${computerGuessedNumber}? Y for Yes, N for No, Q for quit`
    );

    if (humanResponse.toUpperCase() == "Q") {
      continueGame = false;
    } else if (
      humanResponse.toUpperCase() == "Y"
    ) {
      if (computerGuessedNumber == secretNumber) {
        console.log("Winner Winner Chicken Dinner");
        continueGame = false;
      } else {
        console.log("Are you sure ?");
      }
      
    } else if (humanResponse.toUpperCase() == "N") {
      let highOrLow = await ask(
        `Is the secret number higher (H) or lower (L)?`
      );

      if (
        highOrLow.toUpperCase() == "H" &&
        secretNumber > computerGuessedNumber
      ) {
        console.log("Ok I will guess higher");
        guessMin = middle + 1;
        middle = Math.floor((guessMin + guessMax) / 2);
      } else if (highOrLow.toUpperCase() == "Q") {
        if (humanResponse.toUpperCase() == "Q") {
          continueGame = false;
        }
      } else if (highOrLow.toUpperCase() == "L" && secretNumber < computerGuessedNumber) {
        console.log("Ok I will guess lower");
        guessMax = middle - 1;
        middle = Math.floor((guessMin + guessMax) / 2);
      }
      else {
        console.log("Liar Liar Pants on Fire");
      }

    }
  }
  // Now try and complete the program.
  process.exit();
}