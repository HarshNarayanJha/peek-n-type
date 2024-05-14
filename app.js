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
