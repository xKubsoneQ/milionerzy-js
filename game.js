const readline = require('readline').createInterface({input: process.stdin, output: process.stdout});
const chalk = require("chalk");
const questions = require("./resources/questions.json");
const levels = require("./resources/levels.json");
const info = require("./user/info.json");
const editJson = require("./resources/functions/editJson.js");
const xpToLevel = require("./resources/functions/xpToLevel.js");
const xp = require("./resources/functions/xp.js");

let userLevel = 1;
const questionsAnswered = [];

showQuestion()

function showQuestion() {
    console.clear();

    const question = getQuestion();
    const answersLength = question.answers.length;
    let answerIterator = 1;

    console.log(chalk.cyan(`Pytanie za ${levels[userLevel]}zł: ${question.question}`));
    question.answers.forEach(answer => {
        console.log(chalk.red(`${answerIterator++}. `) + chalk.green(`${answer}`));
    });

    readline.question(chalk.magenta(`Wybierz odpowiedź (1-${answersLength}): `), userAnswer => {
        const userAnswerInt = parseInt(userAnswer);

        if(userAnswerInt > answersLength || userAnswerInt < 1 || isNaN(userAnswerInt)) {
            editJson("user/info.json", "money", Math.ceil(levels[userLevel-1] / 1000), "+");
            editJson("user/info.json", "xp", xp(userLevel), "+");

            console.log(`No cóź... Przegrałeś. Wiedziałeś, że wpisujesz złą odpowiedź, miałeś wpisać liczbę od 1 do ${answersLength} :) `);
            console.log(`W tej grze zdobyłeś ${xp(userLevel)}XP oraz ${Math.ceil(levels[userLevel] / 1000)}zł do wydania w sklepie.`);
            
            checkLevelUp();
            readline.close();
            return;
        }

        if(userAnswerInt != question.correct) {
            editJson("user/info.json", "money", Math.ceil(levels[userLevel] / 1000), "+");
            editJson("user/info.json", "xp", xp(userLevel), "+");
            console.log(`Przykro nam, lecz przegrałeś grę. Prawidłowa odpowiedź to: ${question.correct}. Zabierasz ze sobą ${levels[userLevel]}zł.`);
            console.log(`W tej grze zdobyłeś ${xp(userLevel)}XP oraz ${Math.ceil(levels[userLevel] / 1000)}zł do wydania w sklepie.`);

            checkLevelUp();
            readline.close();
            return;
        }

        if(userLevel == 12) {
            editJson("user/info.json", "money", 1000, "+");
            editJson("user/info.json", "xp", xp(userLevel), "+");
            editJson("user/info.json", "wins", 1, "+");
            console.log("GRATULACJE! Wygrałeś MILION złotych!");
            console.log(`Za wygraną otrzymujesz 1000zł do wydania w sklepie gry oraz ${xp(userLevel)} XP.`);

            checkLevelUp();
            readline.close()
        } else {
            console.log("Dokładnie tak! To prawidłowa odpowiedź! Grajmy dalej!");
            userLevel++;
            setTimeout(() => {
                showQuestion();
            }, 1500)
        }
    })
}


function getQuestion() {
    const random = Math.floor(Math.random() * Object.keys(questions).length);
    if(questionsAnswered.includes(random)) return getQuestion();

    questionsAnswered.push(random);
    return questions[random];
}


function checkLevelUp() {
    const level = info.level;
    const xp = info.xp;
    const xptolevel = xpToLevel(level+1);

    if(xp >= xptolevel) {
        console.log(chalk.magenta.bold(`Awansowałeś na poziom ${level+1}!`));
        console.log("W nagrodę otrzymujesz 2000zł do wykorzystania w sklepie gry.");

        const newXp = xp - xptolevel;
        editJson("user/info.json", "level", 1, "+");
        editJson("user/info.json", "xp", newXp);
        editJson("user/info.json", "money", 2000, "+");
    }
}