import chalkAnimation from 'chalk-animation';
import chalk from 'chalk';
import figlet from 'figlet';
import input from 'input';
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

}
await welcome();