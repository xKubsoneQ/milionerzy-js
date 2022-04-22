const info = require("./user/info.json");
const questionPacks = require("./user/questionPacks.json");
const prices = require("./resources/prices.json");
const editJson = require("./resources/functions/editJson.js");

const readline = require('readline').createInterface({input: process.stdin, output: process.stdout});
const chalk = require("chalk");

let n = 1;

console.clear();
console.log(chalk.red.bold("Witaj w sklepie!"));
console.log("Pakiety pytań:");
Object.keys(questionPacks).forEach(questionPack => {
    if(questionPacks[questionPack] == true) console.log(`${n++}. ` + chalk.blue.bold(questionPack) + ": " + "posiadasz to!");
    else console.log(`${n++}. ` + chalk.blue.bold(questionPack) + ": " + `${questionPacks[questionPack]}`.replace("false", prices.packs) + "zł");
});
readline.question(`Co kupujemy? (1-${n-1}): `, answer => {
    if(isNaN(answer) || answer > n-1 || answer < 1) {
        console.log("Nie ma takiego przedmiotu!");
        readline.close();
        setTimeout(() => {
            require("./index.js").showMenu();
        }, 1500);
    } else {
        if(questionPacks[Object.keys(questionPacks)[answer-1]] == true) {
            console.log("Nie możesz kupić tego przedmiotu!");
            readline.close();
            setTimeout(() => {
                require("./index.js").showMenu();
            }, 1500);
        } else {
            if(info.money >= prices.packs) {
                editJson("./user/questionPacks.json", Object.keys(questionPacks)[answer-1], true);
                editJson("user/info.json", "money", info.money - prices.packs);
                console.log("Kupiłeś pakiet pytań!");
                readline.close();
                setTimeout(() => {
                    require("./index.js").showMenu();
                }, 1500);
            } else {
                console.log("Nie masz wystarczająco pieniędzy!");
                readline.close();
                setTimeout(() => {
                    require("./index.js").showMenu();
                }, 1500);
            }
        }
    }
})