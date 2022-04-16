const chalk = require("chalk");
const fs = require('fs');
const readline = require('readline').createInterface({input: process.stdin, output: process.stdout});
const package = require("./package.json");


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

console.clear();

console.log(chalk.magenta(`milionerzy-js, wersja v${package.version}.`));
console.log(chalk.red("1. ") + chalk.blue("Rozpocznij grę!"));
console.log(chalk.red("2. ") + chalk.blue("Sprawdź mój profil!"));
console.log(chalk.red.bold("Sklep pojawi się w grze wkrótce!")); // console.log(chalk.red("3. ") + chalk.blue("Zajrzyj do sklepu!"));
console.log(chalk.blue("Inna odpowiedź - wyjście z gry."));

readline.question("Więc, co robimy?: ", answer => {
    readline.close();

    switch(answer) {
        case "1":
            require("./game.js");
            break;
        case "2":
            require("./profile.js");
            break;
        default:
            process.exit();
    }
})
