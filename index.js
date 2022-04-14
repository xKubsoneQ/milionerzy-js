const questions = require("./files/questions.json");
const levels = require("./files/levels.json");
const c = require("./files/program-config.js");
const readline = require('readline').createInterface({input: process.stdin, output: process.stdout});
const chalk = require("chalk");
let userLevel = 1;

const qa = [];

console.log(chalk.blue(`milionerzy-js, wersja v${c.version}. Miłej gry!\n\n`));
showQuestion();


function showQuestion() {
    let q = getQuestion();
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
            return console.log(`No cóź... Przegrałeś. Wiedziałeś, że wpisujesz złą odpowiedź, miałeś wpisać liczbę od 1 do ${q.answers.length} :) `);
        }
        else {
            const an = parseInt(userAnswer);
            const a = q.answers[an-1];
            if(a != q.correct) return console.log(`Przykro nam, lecz przegrałeś grę. Prawidłowa odpowiedź to: ${q.correct}. Zabierasz ze sobą ${levels[userLevel]}zł, gratulacje!`);
            else {
                if(userLevel == 12) return console.log("GRATULACJE! Wygrałeś MILION złotych!");
                else {
                    console.log("Dokładnie tak! To prawidłowa odpowiedź! Grajmy dalej!");
                    userLevel++;
                    showQuestion();
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