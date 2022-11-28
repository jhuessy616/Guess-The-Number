const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}



start();

async function start() {
   //restart the game until the user says otherwise
  let restart = true;
 
 
while (restart) {
  let humanResponse = await ask (
    "Which version of the game would you like to play? The version where you pick a number and I, the (C)omputer, guesses, or the version where I pick a number and you the (H)uman gets to guess? Press C if you want me to guess the secret number or H if you want to guess the secret number");
 
  if (humanResponse.toUpperCase() == "C") {
    

  // while (computerGuess) 
    // while (restart) 
      console.log(
        "Let's play a game where you (human) make up a number and I (computer) try to guess it."
      );
      // for counting guesses
    let numberOfGuesses = 1;
    // will continue game unless quit using Q
    let continueGame = true;
    // using this to create a loop so that only numbers within the given range can be chosen. 
    let needSecretNumber = true;
    // Our minimum guess value 
    let guessMin = 1;
      // guess minimum is 1, guess maximum is set by user, need to convert entered string to number so we don't get concatication.
      let guessMax = parseInt(
        await ask("What would you like the max value to be? (1 to what)?")
      );
      //  "coputer" telling us what range we picked.
      console.log(
        "You picked a max value of " +
        guessMax +
        ". The range for this round will be 1-" +
        guessMax +
        "."
      );
    //  binary search to get the answer in the least amount of guesses possible
      let middle = Math.floor((guessMin + guessMax) / 2);

      //  checking to be sure secret number is inside range, otherwise computer could never guess it. Will continue looping until a number is picked among the range. 
      while (needSecretNumber) {
        // needs to be variable to be accessed outside of block.
        var secretNumber = parseInt(
          await ask("What is your secret number?\nI won't peek, I promise...\n")
        );
        // checking it is in range. if so it will continue on to guessing. 
        if (guessMin <= secretNumber && secretNumber <= guessMax) {
          console.log("You entered: " + secretNumber);
          needSecretNumber = false;
        //  if not in range will loop back and ask for another secret number.
        } else {
          console.log(
            "That is not in the range of numbers you gave me, please pick another number"
          );
        }
      }

      while (continueGame) {
        //  numberOFGUESSES = numberOFGUESSES + 1;
        // setting the computer guess to the "middle number" we got from the binary search. 
        let computerGuessedNumber = middle;
        let humanResponse = await ask(
          `Is your number ${computerGuessedNumber}? Y for Yes, N for No, Q for quit`
        );

        if (humanResponse.toUpperCase() == "Q") {
          continueGame = false;
        }

        if (humanResponse.toUpperCase() == "Y") {
          if (computerGuessedNumber == secretNumber) {
            console.log("Winner Winner Chicken Dinner! I guessed " +
        numberOfGuesses +
        " times before finding the correct number."
      );
            //  I Guessed your number in " + numberOFGUESSES + " tries");
            continueGame = false;
          } else {
            console.log("Are you sure?");
            numberOfGuesses--;
          }
        }

        if (humanResponse.toUpperCase() == "N") {
          if (secretNumber == computerGuessedNumber) {
            console.log("LIES! You are a sore loser!");
            numberOfGuesses--;
          } else {
            // let UserIsTruthful = true;
            // while (UserIsTruthful)
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
            } else if (
              highOrLow.toUpperCase() == "L" &&
              secretNumber < computerGuessedNumber
            ) {
              console.log("Ok I will guess lower");
              guessMax = middle - 1;
              middle = Math.floor((guessMin + guessMax) / 2);
            } else {
              console.log("Liar Liar Pants on Fire");
              numberOfGuesses--;
              // UserIsTruthful = false;
            }
          }
        }
        numberOfGuesses++;
      }
   
      let restartResponse = await ask(
        `Do you want to restart the game ? Y for Yes, N for No\n`
      );
      //if user say No, then the loop end, any other response will consider that the user wants to continue
      if (restartResponse.toUpperCase() == "N") {
        restart = false;
      }
  }
  // !Different version human is guessing
  else {
    console.log("You have chosen to guess my secret number! ")
    // for counting guesses
    let numberOfGuesses = 1;
    // will continue game unless quit using Q
    let continueGame = true;
     // guess minimum is 1, 
 let guessMin = 1;
    //  guess maximum is set by user, need to convert entered string to number so we don't get concatication.
      let guessMax = parseInt(
        await ask("What would you like the max value to be? (1 to what)?")
      );
      //  "computer" telling us what range we picked.
      console.log(
        "You picked a max value of " +
        guessMax +
        ". The range for this round will be 1-" +
        guessMax +
        "."
      );
   
    // this equation will generate a random number from 1-selected maximum
    let computerSecretNumber = Math.floor(Math.random() * (guessMax - guessMin + 1)) + 1;
    // check if program is working by seeing the secret number. Only for coding purposes, will be commented out later. 
    console.log(computerSecretNumber);

    // getting a numerical value for human guess.
    // while (continueGame) 
      let humanGuessedNumber = 
        await ask("What do you think is my secret number?\n Please enter your guess! You may press 'Q' at anytime to quit");
    while (continueGame) {
      if (humanGuessedNumber > computerSecretNumber) {
      humanGuessedNumber = parseInt(
        await ask("You guessed too high! Guess Lower!"));
  } else if (humanGuessedNumber < computerSecretNumber) {
      humanGuessedNumber = parseInt(
        await ask("You guessed too low! Guess Higher!"));
  } else if (humanGuessedNumber == computerSecretNumber) {
        console.log("Winner Winner Chicken Dinner. You guessed my number! You guessed " +
      numberOfGuesses +
      " times before finding the correct number.");
        continueGame = false
      }
      else if (humanGuessedNumber.toUpperCase() == "Q") {
         continueGame = false;
      }
      numberOfGuesses++;
      //  while human game loop end
    }
    let restartResponse = await ask(
      `Do you want to restart the game ? Y for Yes, N for No\n`);
     //if user say No, then the loop end, any other response will consider that the user wants to continue
    if (restartResponse.toUpperCase() == "N") {
        restart = false;
      }
    
// else to play human version close 
  }
// restart close
}
  
  
    // Now try and complete the program.
    process.exit();
  
 
  // whole game close 
  }

