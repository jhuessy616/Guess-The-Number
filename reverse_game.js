

 const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

 // !Different version human is guessing
start();
//  asyc funtion
async function start() {
  //restart the game until the user says otherwise
  let restart = true;

  //  restart looop
 while (restart) {
     // intro message
      console.log(
        "Let's play a game where I (Computer) make up a number and you (Human) try to guess it."
      );
      // for counting guesses
      let numberOfGuesses = 1;
      // will continue game unless quit using Q
      let continueGame = true;
      // guess minimum is 1,
      let guessMin = 1;
      //  guess maximum is set by user, need to convert entered string to number so we don't get concatenation.
      let guessMax = parseInt(
        await ask("What would you like the max value to be? (1 to what)?")
      );

      /*  Don't want it to accept a non number input, but we have to convert input to numbers to avoid concatenation. So how to weed out inputted letters because their type is now a number as well. Solution: if you divide it by a number the return is NaN. NaN is falsey. So make it not falsey it is true and will run the loop.   */
      while (!(guessMax / 2)) {
        console.log("That is not a number please pick a number");
        guessMax = parseInt(
          await ask("What would you like the max value to be? (1 to what)?")
        );
      }
      //  "computer" telling us what range we picked.
      console.log(
        "You picked a max value of " +
          guessMax +
          ". The range for this round will be 1-" +
          guessMax +
          "."
      );

      // this equation will generate a random number from 1-selected maximum
      let computerSecretNumber =
        Math.floor(Math.random() * (guessMax - guessMin + 1)) + 1;
      // check if program is working by seeing the secret number. Only for coding purposes, will be commented out later.
      // console.log(computerSecretNumber);

      // getting a numerical value for human guess.
      let humanGuessedNumber = await ask(
        "What do you think is my secret number?\n Please enter your guess! You may press 'Q' at anytime to quit"
      );
      // while input not matched or not in range, will ask for a proper response
      while (
        humanGuessedNumber.toUpperCase().trim() != "Q" &&
        !(guessMin <= humanGuessedNumber && humanGuessedNumber <= guessMax)
      ) {
        humanGuessedNumber = await ask(
          "That is not a correct input, please enter a number between 1 and " +
            guessMax +
            " or Q for quit"
        );
      }

      // game will continue unless specified to quit
      while (continueGame) {
        // human guess too high prompted to guess lower
        if (humanGuessedNumber > computerSecretNumber) {
          humanGuessedNumber = parseInt(
            await ask("You guessed too high! Guess Lower!")
          );
        }
        // human guessed too low, prompted to guess higher
        else if (humanGuessedNumber < computerSecretNumber) {
          humanGuessedNumber = parseInt(
            await ask("You guessed too low! Guess Higher!")
          );
        }
        // human guessed the right number, winning message
        else if (humanGuessedNumber == computerSecretNumber) {
          console.log(
            "Winner Winner Chicken Dinner. You guessed my number! You guessed " +
              numberOfGuesses +
              " time(s) before finding the correct number."
          );
          continueGame = false;
        }
        // if Q is entered quit, offer restart so can switch version
        else if (humanGuessedNumber.toUpperCase().trim() == "Q") {
          continueGame = false;
        }
        // counting guesses
        numberOfGuesses++;
      }
      // asking if you want to restart, if user says No, then the loop end, any other response will continue the game
      let restartResponse = await ask(
        `Do you want to restart the game ? Y for Yes, N for No\n`
      );

      if (restartResponse.toUpperCase().trim() == "N") {
        restart = false;
      }

     
    }
   
  

  process.exit();

  // whole game close curly boy
}
