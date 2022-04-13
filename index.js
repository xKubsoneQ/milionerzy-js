const questions = require("./files/questions.json");
const levels = require("./files/levels.json");
const readline = require('readline').createInterface({input: process.stdin, output: process.stdout});
let userLevel = 1;


showQuestion();


function showQuestion() {
    let q = getQuestion();
    console.log(`Pytanie za ${levels[userLevel]}zł: ${q.question}`);
    let n = 1;
    q.answers.forEach(answer => {
        console.log(`${n++}. ${answer}`);
    });

    readline.question("Wybierz odpowiedź (1-4): ", userAnswer => {
        const answers = ["1", "2", "3", "4"];
        if(!answers.includes(userAnswer)) {
            return console.log("No cóź... Przegrałeś. Wiedziałeś, że wpisujesz złą odpowiedź, miałeś wpisać liczbę od 1 do 4 :) ");
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
    const question = questions[Math.floor(Math.random() * Object.keys(questions).length)];
    return question;
}