const info = require("./user/info.json");
const stats = require("./user/stats.json");
const chalk = require("chalk");

module.exports = {
    execute() {
        console.log(`\nPieniądze: ${info.money}zł (Każdy 1000zł wygrany w grze = 1zł do użycia w sklepie)`);
        console.log(`Poziom: ${info.level} (${info.xp} XP)`);
        console.log(`Wygranych: ${stats.wins}`);
        // console.log("\nPakiety pytań:");
        // console.log(`Polityka: ${questionPacks.polityka}\nSeriale: ${questionPacks.seriale}\nYouTube: ${questionPacks.youtube}\nTechnologia: ${questionPacks.technologia}`.replaceAll("false", "nie posiadasz").replaceAll("true", "posiadasz"));
    }
}