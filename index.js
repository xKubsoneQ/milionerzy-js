const chalk = require("chalk");
const fs = require('fs');
const readline = require('readline').createInterface({input: process.stdin, output: process.stdout});
const package = require("./package.json");
const editJson = require("./resources/functions/editJson.js");

console.clear();
console.log(chalk.magenta(`milionerzy-js, wersja v${package.version}.`));

if(!fs.existsSync("./user/info.json")) {
    let json = {
        money: 0,
        level: 1,
        xp: 0
    }
    json = JSON.stringify(json, null, 2);
    fs.writeFile('./user/info.json', json, (err) => {
        if(err) throw new Error("Nie udało się utworzyć pliku z danymi użytkownika!");
    });
}

if(!fs.existsSync("./user/stats.json")) {
    let json = {
        wins: 0
    }
    json = JSON.stringify(json, null, 2);
    fs.writeFile('./user/stats.json', json, (err) => {
        if(err) throw new Error("Nie udało się utworzyć pliku ze statystykami użytkownika!");
    });
}



console.log(chalk.red("1. ") + chalk.blue("Rozpocznij grę!"));
console.log(chalk.red("2. ") + chalk.blue("Sprawdź mój profil!"));
console.log(chalk.red.bold("Sklep pojawi się w grze wkrótce!"));
// console.log(chalk.red("3. ") + chalk.blue("Zajrzyj do sklepu!"));
console.log(chalk.blue("Inna odpowiedź - wyjście z gry."));
readline.question("Więc, co robimy?: ", answer => {
    if(answer == "1") {
        readline.close();
        require("./game.js").execute();
    } else if(answer == "2") {
        readline.close();
        require("./profile.js").execute();
    /* } else if(answer == "3") {
    //     readline.close();
    //     require("./shop.js").execute();
    */ } else {
        process.exit(0);
    }
})
