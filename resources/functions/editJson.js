const fs = require('fs');

module.exports = (file, variable, value, type) => {
    const f = require(`../../${file}`);
    
    if(type == "+") {
        f[variable] += value;
    } else f[variable] = value;

    fs.writeFile(`${file}`, JSON.stringify(f, null, 2), function writeJSON(err) {
        if(err) return console.log(err);
    });
}   