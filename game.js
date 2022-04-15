const questions = require("./resources/questions.json");
const levels = require("./resources/levels.json");
const info = require("./user/info.json");
const editJson = require("./resources/functions/editJson.js");
const xpToLevel = require("./resources/functions/xpToLevel.js");
const xp = require("./resources/functions/xp.js");
const readline = require('readline').createInterface({input: process.stdin, output: process.stdout});
const chalk = require("chalk");
let userLevel = 1;

const qa = [];

module.exports = {
    execute() {
        showQuestion();
    }
}


function showQuestion() {
    let q = getQuestion();
    console.clear()
    console.log(chalk.cyan(`Pytanie za ${levels[userLevel]}zł: ${q.question}`));
    let n = 1;
    q.answers.forEach(answer => {
        console.log(chalk.red(`${n++}. `) + chalk.green(`${answer}`));
    });
    readline.question(chalk.magenta(`Wybierz odpowiedź (1-${q.answers.length}): `), userAnswer => {
        const answers = q.answers.length;
        const answerint = parseInt(userAnswer);
        if(answerint > answers || answerint < 1 || isNaN(answerint)) {
            readline.close();
            editJson("user/info.json", "money", Math.ceil(levels[userLevel] / 1000), "+");
            editJson("user/info.json", "xp", xp(userLevel), "+");
            console.log(`No cóź... Przegrałeś. Wiedziałeś, że wpisujesz złą odpowiedź, miałeś wpisać liczbę od 1 do ${q.answers.length} :) `);
            console.log(`W tej grze zdobyłeś ${xp(userLevel)}XP oraz ${Math.ceil(levels[userLevel] / 1000)}zł do wydania w sklepie.`);
            checkLevelUp();
        }
        else {
            const an = parseInt(userAnswer);
            const a = q.answers[an-1];
            if(a != q.correct) {
                editJson("user/info.json", "money", Math.ceil(levels[userLevel] / 1000), "+");
                editJson("user/info.json", "xp", xp(userLevel), "+");
                console.log(`Przykro nam, lecz przegrałeś grę. Prawidłowa odpowiedź to: ${q.correct}. Zabierasz ze sobą ${levels[userLevel]}zł, gratulacje!`);
                console.log(`W tej grze zdobyłeś ${xp(userLevel)}XP oraz ${Math.ceil(levels[userLevel] / 1000)}zł do wydania w sklepie.`);
                checkLevelUp();
            }
            else {
                if(userLevel == 12) {
                    editJson("user/info.json", "money", 1000, "+");
                    editJson("user/info.json", "xp", xp(userLevel), "+");
                    editJson("user/stats.json", "wins", 1, "+");
                    console.log("GRATULACJE! Wygrałeś MILION złotych!");
                    console.log(`Za wygraną otrzymujesz 1000zł do wydania w sklepie gry oraz ${xp(userLevel)} XP.`);
                    checkLevelUp();
                }
                else {
                    console.log("Dokładnie tak! To prawidłowa odpowiedź! Grajmy dalej!");
                    userLevel++;
                    setTimeout( () => {
                        showQuestion();
                    }, 3000)
                };
            };
        }
    });
}

function getQuestion() {
    const random = Math.floor(Math.random() * Object.keys(questions).length);
    if(qa.includes(random)) {
        return getQuestion();
    }
    qa.push(random);
    const question = questions[random];
    return question;
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