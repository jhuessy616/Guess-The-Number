const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();
//  asyc funtion
async function start() {
  //restart the game until the user says otherwise
  let restart = true;

  //  restart loop
  while (restart) {
    // asking which version the player wants to play
    let humanResponse = await ask(
      "Which version of the game would you like to play? The version where you pick a number and I, the (C)omputer, guesses, or the version where I pick a number and you the (H)uman gets to guess? Press C if you want me to guess the secret number or H if you want to guess the secret number"
    );

    // computer guesses your secret number version
    if (humanResponse.toUpperCase().trim() == "C") {
      // intro message
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

      // guess minimum is 1, guess maximum is set by user, need to convert entered string to number so we don't get concatenation.
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

      //  computer telling us what range we picked.
      console.log(
        "You picked a max value of " +
          guessMax +
          ". The range for this round will be 1-" +
          guessMax +
          "."
      );
      //  finding the middle number between our max and min for optimal search
      let middle = Math.floor((guessMin + guessMax) / 2);

      //  checking to be sure secret number is inside range, otherwise computer could never guess it. Will continue looping until a number is picked among the range.
      while (needSecretNumber) {
        // asking for humans secret number, variable so it is accesible outside of loop
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
            "That is not in the range of numbers you gave me, please pick another number between 1 and " +
              guessMax +
              "."
          );
        }
      }

      //  As long as game hasn't been quit will stay in while loop guessing
      while (continueGame) {
        // setting the computer guess to the middle number we calculated as the best guess
        let computerGuessedNumber = middle;

        //  computer guessing number
        let humanResponse = await ask(
          `Is your number ${computerGuessedNumber}? Y for Yes, N for No, Q for quit`
        );
        // while input not matched, will ask for a proper response
        while (
          humanResponse.toUpperCase().trim() != "Q" &&
          humanResponse.toUpperCase().trim() != "Y" &&
          humanResponse.toUpperCase().trim() != "N"
        ) {
          humanResponse = await ask(
            "That is not a correct input, please enter Y for yes, N for no, or Q for quit"
          );
        }
        //   q for quitting game, will offer to restart so you can switch versions
        if (humanResponse.toUpperCase().trim() == "Q") {
          continueGame = false;
        }
        //   if Yes, computer won and says how many guesses were needed before getting the correct answer
        if (humanResponse.toUpperCase().trim() == "Y") {
          if (computerGuessedNumber == secretNumber) {
            console.log(
              "Winner Winner Chicken Dinner! I guessed " +
                numberOfGuesses +
                " time(s) before finding the correct number."
            );
            // game will quit and you will be asked if you'd like to restart
            continueGame = false;
            // incorrectly enter yes and guessed number was not your number
          } else {
            console.log("Are you sure?");
            // not counting guesses anytime there is an error or a lie
            numberOfGuesses--;
          }
        }
        //  Answer is no, but actually it was your number
        if (humanResponse.toUpperCase().trim() == "N") {
          if (secretNumber == computerGuessedNumber) {
            console.log("LIES! You are a sore loser!");
            numberOfGuesses--;
          }
          //  now need to ask if the number is higher or lower and recalculate the best guess
          else {
            let highOrLow = await ask(
              `Is the secret number higher (H) or lower (L)?`
            );
            //  human responds higher and it's true. computer recalculates best guess and guesses higher
            if (
              highOrLow.toUpperCase().trim() == "H" &&
              secretNumber > computerGuessedNumber
            ) {
              console.log("Ok I will guess higher");
              guessMin = middle + 1;
              middle = Math.floor((guessMin + guessMax) / 2);
            }
            // Human says lower and it's true, computer recalulates best guess and guesses lower,
            else if (
              highOrLow.toUpperCase().trim() == "L" &&
              secretNumber < computerGuessedNumber
            ) {
              console.log("Ok I will guess lower");
              guessMax = middle - 1;
              middle = Math.floor((guessMin + guessMax) / 2);
            }
            // Lie detector, will repeat it's past guess and will not count this towards number of guesses
            // Have it the other way checking the range in different way notes, but I like immediate lie detection more
            else {
              console.log("Liar Liar Pants on Fire");
              numberOfGuesses--;
            }
          }
        }
        // number of guesses increasing by 1 each loop
        numberOfGuesses++;
      }
      // Asking user if they want to restart
      let restartResponse = await ask(
        `Do you want to restart the game ? Y for Yes, N for No\n`
      );
      //if user say No, then the loop end, any other response will consider that the user wants to continue
      if (restartResponse.toUpperCase().trim() == "N") {
        restart = false;
      }
    }
    // !Different version human is guessing
    // did not choose "C" for computer guessing so brings us to human guessing
    else {
      console.log("You have chosen to guess my secret number! ");
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

      // else to play human version close curly boy
    }
    // restart close curly boy
  }

  process.exit();

  // whole game close curly boy
}
