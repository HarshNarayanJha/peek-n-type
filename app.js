import chalkAnimation from 'chalk-animation';
import chalk from 'chalk';
import figlet from 'figlet';
import input from 'input';
import { createSpinner } from 'nanospinner';
import sfx from 'sfx';

var playerName;
var score;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

class Question {
    constructor(text, speed) {
        this.text = text;
        this.speed = speed;
        this.wait = text.length / speed * 60;
    }
}

const questions = [
    new Question("This is simple", 0.2),
    new Question("Wanna type out this long text", 0.6),
    new Question("How about ranking up the difficulty", 1),
]

async function welcome() {
    figlet(
        "Peek-n-Type",
        { font: "Stick Letters" }, async (err, data) => {
        if (err) {
            console.log("Something went wrong");
            console.dir(err);
            return;
        }

        chalkAnimation.neon(data);

        await sleep(2500);
        console.log(chalk.bold("Welcome to the Peek-n-Type game"));
        await sleep(2000);

        await intro();
    });
}

async function intro() {
    console.log("\n");
    console.log(`
        ${chalk.bgBlue.underline("How to Play")}
        In this game, you will be shown a text to peek for a duration of time, and then will be asked to type that text out

    `);
    await sleep();
    console.log("If you type it " + chalk.bgGreen(" correctly ") + ", you get " + chalk.green("+1") + " point");
    await sleep();
    playerName = await input.text("To begin, what's your name?", {
        validate(answer) {
            if (answer.length != 0) return true;

            return 'Your name has to be something';
        }
    });
    await sleep(500);
    console.log(chalk.yellowBright("Let's Start the game, " + playerName + "!"));

    await game_loop();
}

async function game_loop() {
    score = 0;
    var idx = 0;
    for (const q of questions) {
        const question = chalkAnimation.radar(q.text, q.speed);
        await sleep(q.wait);
        question.stop();

        const userText = await input.text("What was written there?", {
            validate(answer) {
                if (answer.length != 0) return true;

                return `Atleast enter something 🤦`
            }
        });

        const check = createSpinner("Checking your answer").start();
        await sleep(1000);
        if (userText === q.text) {
            check.success( {text: "Yay 🎉 Right Answer"} );
            sfx.play("sounds/correct.aiff");

            await sleep(1000);
            chalkAnimation.neon(chalk.greenBright("+1 Points 🪙 !"), 2);
            score++;


        } else {
            check.error( {text: "Uff 🤦 How did you get it wrong?"} );
            sfx.funk();
        }

        await sleep(1500);

        if (idx+1 != questions.length) {
            console.log(chalk.blue("Now onto the next question"));
            await sleep(800);
            console.log(chalk.inverse("Get ready 👀👀👀"));

            await sleep(2000);
            console.log();
        }

        idx++;
    };

    await outro();
}

async function outro() {
    await sleep(800);
    console.log("\nCongrats 👏 for finishing the game!");
    await sleep(1500);
    console.log(`
    Your Score is ${chalk.bgGreenBright(score)} points 🪙🪙🪙!
    `);
    
    await sleep(900);
    console.log("Play again sometime!");
    await sleep(500);
    console.log("Bye");
}

await welcome();