const info = require("./user/info.json");
const questionPacks = require("./user/questionPacks.json");
const chalk = require("chalk");

console.clear();
console.log(`\nPieniądze: ${info.money}zł (Każdy 1000zł wygrany w grze = 1zł do użycia w sklepie)`);
console.log(`Poziom: ${info.level} (${info.xp} XP)`);
console.log(`Wygranych: ${info.wins}`);
console.log(chalk.magenta.bold("\nPakiety pytań:"));

Object.keys(questionPacks).forEach(questionPack => {
    console.log(`- ` + chalk.blue.bold(questionPack) + ": " + `${questionPacks[questionPack]}`.replaceAll("false", "nie posiadasz").replaceAll("true", "posiadasz"));
});

console.log("\nPowrót do menu głównego za 10 sekund...");

setTimeout(() => {
    require("./index.js").showMenu();
}, 10000);