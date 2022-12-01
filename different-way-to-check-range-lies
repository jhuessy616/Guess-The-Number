
<!-- !  It can't be less than 8 but also more than 7 for example. Prefer my version because it doesn't allow any cheating.  -->
This version would allow you to lie a few times before the computer catches the lie. 
<!-- This was an early on idea and curiousity, my code has more updates now, but you could easily switch in these conditions if you only wanted to check range -->

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}
<!-- code below  -->

// start();


start();

async function start() {
    let restart = true;
    //restart the game until the user says otherwise
    while (restart) {
        console.log(
            "Let's play a game where you (human) make up a number and I (computer) try to guess it. You may enter Q at anytime to quit the game."
        );

        let numberOfGuess = 0;
        let continueGame = true;
        let guessMin = 1;
        // let guessMax = 100;
        let guessMax = await ask("What would you like the max value to be? (1 to what)?");

        console.log(
            "You picked a max value of " +
            guessMax +
            ". The range for this round will be 1-" +
            guessMax +
            "."
        );
        // let guessMax = 100;
        let middle = Math.floor((guessMin + parseInt(guessMax)) / 2);

        let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
        console.log("You entered: " + secretNumber);

        while (continueGame) {
            let computerGuessedNumber = middle;
            let humanResponse = await ask(
                `Is your number ${computerGuessedNumber} ? Y for Yes, N for No, Q for quit\n`
            );

            if (humanResponse.toUpperCase() == "Q") {
                continueGame = false;
            } else if (humanResponse.toUpperCase() == "Y") {
                if (computerGuessedNumber == secretNumber) {
                    console.log("Winner Winner Chicken Dinner");
                    continueGame = false;
                } else {
                    console.log("Are you sure ?");
                }
            } else if (humanResponse.toUpperCase() == "N") {
                let highOrLow = await ask(`Is the secret number higher (H) or lower (L)?\n`);

                if (highOrLow.toUpperCase() == "H") {
                    <!-- !Here is the different code  -->
                    if (computerGuessedNumber === guessMax) {
                        console.log("You said it was higher than " + guessMax + ", so it can't also be lower than " + (guessMax + 1) + "!\n");
                    } else {
                        console.log("Ok I will guess higher");
                        guessMin = middle + 1;
                        middle = Math.floor((guessMin + parseInt(guessMax)) / 2);
                    }
                } else if (highOrLow.toUpperCase() === "Q") {
                    if (humanResponse.toUpperCase() === "Q") {
                        continueGame = false;
                    }
                } else if (highOrLow.toUpperCase() === "L") {
                    if (computerGuessedNumber === guessMin) {
                        <!-- !Here is the different code  -->
                        console.log("You said it was lower than " + guessMin + ", so it can't also be higher than " + (guessMin - 1) + "!\n");
                    } else {
                        console.log("Ok I will guess lower");
                        guessMax = middle - 1;
                        middle = Math.floor((guessMin + guessMax) / 2);
                    }
                }
            }
            numberOfGuess++;
        }
        console.log('The computer guessed ' + numberOfGuess + ' times before finding the correct number');
        let restartResponse = await ask(
            `Do you want to restart the game ? Y for Yes, N for No\n`
        );
        //if user say No, then the loop end, any other response will consider that the user wants to continue
        if (restartResponse.toUpperCase() === 'N') {
            restart = false;
        }
    }

// Now try and complete the program.
process.exit();
}